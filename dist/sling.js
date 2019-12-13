new function (window) {

    let state = {}, autoUpdateMap = new Map(), destroyFuncArr = [],
        router = {
            segmentArr: [],
            routeMap: new Map(),
            params: null
        };

    Sling = s = function () { }
    s.version = 1.8;

    const renderElement = ({ tagName, attrs, children }) => {
        let el = document.createElement(tagName);

        // set attributes
        let vType;
        for (let [k, v] of Object.entries(attrs)) {
            vType = typeof v;

            if (vType === 'function') {
                el[k] = v;
            } else {
                el.setAttribute(k, v);
            }
        }

        // set children
        for (let child of children) {
            let rendChild = renderMarkup(child);
            el.appendChild(rendChild);
        }

        return el;
    }

    const unifyChanges = (nodeArray, nodeList) => {
        let unified = [];
        for (let i = 0; i < Math.max(nodeArray.length, nodeList.length); ++i) {
            unified.push([nodeArray[i], nodeList[i]]);
        }
        return unified;
    };

    const diffVAttrs = (oldAttrs, newAttrs, oldAttrsStr, newAttrsStr) => {
        let changes = [];
        let vType, hasAttrib, attribValue;

        // no changes to attrs
        if (oldAttrsStr === newAttrsStr) {
            // set new attributes
            for (let [k, v] of Object.entries(newAttrs)) {
                vType = typeof v;

                if (vType === 'function') {
                    changes.push(node => {
                        node[k] = v;
                        return node;
                    });
                } else {
                    changes.push(node => {
                        hasAttrib = node.hasAttribute(k);
                        attribValue = node.getAttribute(k);

                        if (hasAttrib && attribValue !== v) node.setAttribute(k, v);
                        else if (!hasAttrib) node.setAttribute(k, v);

                        return node;
                    });
                }
            }
        } else {
            // set new attributes
            for (let [k, v] of Object.entries(newAttrs)) {
                vType = typeof v;

                if (vType === 'function') {
                    changes.push(node => {
                        node[k] = v;
                        return node;
                    });
                } else {
                    changes.push(node => {
                        node.setAttribute(k, v);
                        return node;
                    });
                }
            }

            // remove old attributes
            for (let k in oldAttrs) {
                if (!(k in newAttrs)) {
                    changes.push(node => {
                        // Runtime environment clear
                        node[k] = false;

                        node.removeAttribute(k);
                        return node;
                    });
                }
            }
        }

        return node => {
            for (let change of changes) {
                change(node);
            }
        };
    };

    const diffVChildren = (oldVChildren, newVChildren) => {
        let childChanges = [];
        oldVChildren.forEach((oldVChild, i) => {
            childChanges.push(diffVDom(oldVChild, newVChildren[i]));
        });

        let addChanges = [];
        for (let additionalVChild of newVChildren.slice(oldVChildren.length)) {
            addChanges.push(node => {
                node.appendChild(renderMarkup(additionalVChild));
                return node;
            });
        }

        return parent => {
            for (let [change, child] of unifyChanges(childChanges, parent.childNodes)) {
                if (change) change(child);
            }

            for (let change of addChanges) {
                change(parent);
            }

            return parent;
        };
    };

    const diffVDom = (vOldNode, vNewNode) => {
        if (!vNewNode) {
            return node => {
                node.remove();
                return undefined;
            };
        }

        if (typeof vOldNode === 'string' ||
            typeof vNewNode === 'string') {
            if (vOldNode !== vNewNode) {
                return node => {
                    let newNode = renderMarkup(vNewNode);
                    node.replaceWith(newNode);
                    return newNode;
                };
            } else {
                return node => undefined;
            }
        }

        if (vOldNode.tagName !== vNewNode.tagName) {
            return node => {
                let newNode = renderMarkup(vNewNode);
                node.replaceWith(newNode);
                return newNode;
            };
        }

        let patchVAttrs = diffVAttrs(vOldNode.attrs, vNewNode.attrs, vOldNode.attrsStr, vNewNode.attrsStr);
        let patchVChildren = diffVChildren(vOldNode.children, vNewNode.children);

        return node => {
            patchVAttrs(node);
            patchVChildren(node);
            return node;
        };
    };

    const renderMarkup = (view) => {
        if (typeof view === 'string') {
            return document.createTextNode(view);
        }

        return renderElement(view);
    }

    const render = (component) => {
        if (component.slOnInit) {
            component.slOnInit();
        }

        component = component.view();

        if (typeof component === 'string') {
            return document.createTextNode(component);
        }

        return renderElement(component);
    }

    const setUrlSegments = () => {
        let hashStr = window.location.href.split('#')[1];

        if (hashStr) {
            router.segmentArr = hashStr.split('/');
        }
    }

    const mount = (target, component) => {
        let rendComp = render(component);

        /*
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
        target.appendChild(rendComp);
        */

        target.replaceWith(rendComp);

        let i = setInterval(() => {
            if (component.slAfterInit) component.slAfterInit();
            clearInterval(i);
        }, 0);

        return rendComp;
    }

    s.setState = (newStateObj) => {
        state = newStateObj;
    }

    s.getState = () => {
        return state;
    }

    s.textNode = (text) => {
        return String(text);
    }

    s.markup = (tagName, { attrs = {}, children = [] } = {}) => {
        let attrsStr = '';
        for (let [k, v] of Object.entries(attrs)) {
            attrsStr += k + v;
        }

        return {
            tagName,
            attrs,
            children,
            attrsStr
        };
    }

    s.mount = (eleId, component) => {
        let id = eleId;
        let ele = document.getElementById(eleId);

        if (ele !== null) {
            return mount(ele, component);
        } else {
            throw 'Element ID \'' + id + '\' is invalid.';
        }
    }

    s.update = (rootEl, component) => {
        rootEl = document.getElementById(rootEl);

        let vNewApp = component.view.bind(component)();
        let patch = diffVDom(rootEl, vNewApp);
        rootEl = patch(rootEl);
        rootEl = vNewApp;
    }

    s.clearAutoUpdate = (rootEl) => {
        let id = rootEl;
        rootEl = document.getElementById(rootEl);

        if (rootEl === null) {
            throw 'Element ID \'' + id + '\' is invalid.';
        }
        else if (autoUpdateMap.has(rootEl.id)) {
            clearInterval(autoUpdateMap.get(rootEl.id));
            autoUpdateMap.delete(rootEl.id);
        }
    }

    s.autoUpdate = (rootEl, component, millis = 17) => {
        rootEl = document.getElementById(rootEl);
        let oldRoot = rootEl;

        let vNewApp = component.view.bind(component)();
        let patch = diffVDom(oldRoot, vNewApp);
        rootEl = patch(rootEl);
        oldRoot = vNewApp;

        let newUpdateInterval = setInterval(() => {
            let vNewApp = component.view.bind(component)();
            let patch = diffVDom(oldRoot, vNewApp);
            rootEl = patch(rootEl);
            oldRoot = vNewApp;
        }, millis);

        if (autoUpdateMap.has(rootEl.id)) {
            clearInterval(autoUpdateMap.get(rootEl.id));
            autoUpdateMap.delete(rootEl.id);
        }

        autoUpdateMap.set(rootEl.id, newUpdateInterval);
    }

    s.getRouteSegments = () => {
        return router.segmentArr;
    }

    s.getRouteParams = () => {
        return router.params;
    }

    s.getRoute = () => {
        return window.location.href.split('#')[1];
    }

    s.addRoute = function (routeExp, routeObj) {
        router.routeMap.set(new RegExp('^' + routeExp.replace(/:[^\/]+/g, '([^\\/]+)') + '$'), routeObj);
    }

    s.route = function (routeStr, routeParams = {}) {
        router.params = routeParams;

        let comp = null;
        router.routeMap.forEach((value, key) => {
            if (key.test(routeStr)) {
                // Handle destroy functions
                destroyFuncArr.forEach(destroyFunc => {
                    destroyFunc();
                });
                destroyFuncArr = [];

                window.location.hash = routeStr;
                setUrlSegments();

                // Check if automatically updated currently
                let root = document.getElementById(value.root);
                let isAutoUpdated = false;

                if (autoUpdateMap.has(root.id)) {
                    clearInterval(autoUpdateMap.get(root.id));
                    autoUpdateMap.delete(root.id);
                    isAutoUpdated = true;
                }

                if (value.component) {
                    // Set new content
                    mount(root, value.component);

                    // Set new destroy functions
                    if (value.component.slOnDestroy)
                        destroyFuncArr.push(value.component.slOnDestroy);

                    // Re-enable autoupdate
                    if (isAutoUpdated) {
                        s.autoUpdate(value.root, value.component);
                    }

                    comp = value.component;
                }
            }
        });

        return comp;
    }

    setUrlSegments();

}(this);

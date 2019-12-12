import SelectedPartHeaderComponent from "./selected-part-header.component";

const MOCK_DATA_MAX_VALUE_EXCLUSIVE = 101;
const MOCK_DATA_MONTH_RANGE = 24;

class PartSupplyComponent {

    constructor() {
        this.data = [];
    }

    formatMockDate(dateToFormat) {
        return dateToFormat.getMonth() + '/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
    }

    getMockXData(targetMonths) {
        const mockYData = [];
        const currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() - targetMonths);

        for (let i = 0; i < targetMonths; ++i) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            mockYData.push(this.formatMockDate(currentDate));
        }

        return mockYData;
    }

    getMockYData(targetMonths) {
        const mockXData = [];

        for (let i = 0; i < targetMonths; ++i) {
            // Random [0 - 100]
            mockXData.push(Math.floor(Math.random() * MOCK_DATA_MAX_VALUE_EXCLUSIVE));
        }

        return mockXData;
    }

    slOnInit() {
        this.data = [
            {
                x: this.getMockXData(MOCK_DATA_MONTH_RANGE),
                y: this.getMockYData(MOCK_DATA_MONTH_RANGE),
                type: 'bar'
            }
        ];
    }

    slAfterInit() {
        if (document.getElementById('myDiv')) {
            Plotly.newPlot('myDiv', this.data);
        }
    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divSheetContent',
                noTouch: 'true'
            },
            children: [
                new SelectedPartHeaderComponent().view(),
                s.markup('div', {
                    attrs: {
                        id: 'myDiv',
                        noTouch: 'true'
                    }
                })
            ]
        })
    }
}

export default PartSupplyComponent;
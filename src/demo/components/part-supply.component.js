import SelectedPartHeaderComponent from "./selected-part-header.component";
import { getState, markup, route } from '../../js/sling.min'

const MOCK_DATA_MAX_VALUE_EXCLUSIVE = 101;
const MOCK_DATA_MONTH_RANGE = 24;

class PartSupplyComponent {

    constructor() {
        this.data = [];
    }

    formatMockDate(dateToFormat) {
        if (dateToFormat.getMonth() === 0) {
            return '12/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        } else {
            return dateToFormat.getMonth() + '/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        }
    }

    getMockYData(targetMonths) {
        const mockYData = [];

        for (let i = 0; i < targetMonths; ++i) {
            // Random [0 - 100]
            mockYData.push(Math.floor(Math.random() * MOCK_DATA_MAX_VALUE_EXCLUSIVE));
        }

        return mockYData;
    }

    getMockXData(targetMonths) {
        const mockXData = [];
        const currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() - targetMonths);

        for (let i = 0; i < targetMonths; ++i) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            mockXData.push(this.formatMockDate(currentDate));
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
        if (document.getElementById('chartDiv')) {
            Plotly.newPlot('chartDiv', this.data, { }, { responsive: true, displaylogo: false });
        }

        const bench = new Date() - getState().getBenchTime();
        console.log(bench);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divSheetContent'
            },
            children: [
                new SelectedPartHeaderComponent().view(),
                markup('div', {
                    attrs: {
                        id: 'chartDiv',
                        sluseexisting: 'true',
                        style: 'width: 90vw;'
                    }
                })
            ]
        })
    }
}

export default PartSupplyComponent;
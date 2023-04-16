import { useState, useEffect } from 'react';
import { Accordion, Tooltip } from 'flowbite-react';
import { MdTimeline, MdAccessTime } from 'react-icons/md';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
}

function ChartNft({ nft }) {
    const [last7SaleEvent, setLast7SaleEvent] = useState([]);
    function getLast7SaleEvents() {
        const saleEvents = nft?.events?.filter(
            event => event?.eventName === 'Sale'
        );
        if (saleEvents?.length > 0) {
            const results = [];

            saleEvents.slice(0, 7).forEach(item => {
                const date = new Date(parseInt(item.startTimestamp));

                const dateString = date.toISOString().slice(0, 10);
                const existingDay = results.find(
                    day => day.date === dateString
                );
                if (existingDay) {
                    existingDay.total += item.price;
                    existingDay.sale++;
                } else {
                    results.push({
                        date: dateString,
                        total: item.price,
                        average: item.price,
                        sale: 1,
                    });
                }
            });
            results.forEach(day => {
                day.average = day.total / day.sale;
            });
            setLast7SaleEvent(results);
        }
    }
    useEffect(() => {
        getLast7SaleEvents();
    }, []);

    const html = (
        <div className="flex flex-col">
            <span className="text-white font-semibold text-base">this.x</span>
        </div>
    );

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            height: 165,
            fontFamily: 'Popins',
        },
        title: {
            text: '',
            align: 'left',
        },
        xAxis: {
            categories: last7SaleEvent.map(event => event.date),
        },
        yAxis: {
            className: 'fill-[#000]',
            min: 0,
            title: {
                text: 'Volume (ETH)',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'white',
                    textOutline: 'none',
                    letterSpacing: '0.02em',
                },
            },
            stackLabels: {
                enabled: false,
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            backgroundColor: '#34383F',
            borderColor: 'transparent',
            borderRadius: 10,
            useHTML: true,
            formatter: function () {
                const event = last7SaleEvent.find(day => day.date === this.x);
                return `
                    <div class="highcharts-tooltip">
            <p style="color: white">${event.total} ETH</p>
            <span>Avg. price: ${event.average}</span>
            <span>Num. sales: ${event.sale}</span>
            <span>${event.date}</span>
        </div>                  
                   `;
            },
        },
        plotOptions: {
            column: {
                borderRadius: 4,
                pointWidth: 40,
                color: '#E5E8EB',
            },
        },
        series: [
            { name: 'Total Price', data: last7SaleEvent.map(day => day.total) },
        ],
        credits: {
            enabled: false,
        },
        navigation: {
            buttonOptions: {
                enabled: false,
            },
        },
    };
    return (
        <Accordion
            alwaysOpen={true}
            className="mt-5 bg-[#262b2f] border-0 divide-y-0"
        >
            <Accordion.Panel>
                <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                    <div className="flex">
                        <MdTimeline className="mr-[10px] text-2xl" />
                        Price History
                    </div>
                </Accordion.Title>
                <Accordion.Content className="px-5 py-2">
                    {last7SaleEvent.length > 0 ? (
                        <div className="h-[165px]">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-[#8a939b] py-10">
                            <MdAccessTime className="text-[32px] mb-8" />
                            <div className="text-sm font-semibold">
                                No events have occurred yet
                            </div>
                            <div className="text-sm">Check back later.</div>
                        </div>
                    )}
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default ChartNft;

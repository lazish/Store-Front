import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoldReport } from '../interface/sold';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-chartreport',
  templateUrl: './chartreport.component.html',
  styleUrls: ['./chartreport.component.css'],
})
export class ChartreportComponent implements OnInit {
  stackedData: any;

  endDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );

  startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  );

  total: number = 0;

  stackedOptions: any;

  data: any;

  chartOptions: any;

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reportService
      .getReport(this.startDate, this.endDate)
      .subscribe((x) => {
        this.total = 0;
        x.forEach((item: SoldReport) => (this.total += item.totalSales));
        this.stackedData = {
          labels: x.map((item: SoldReport) => item.productName),
          datasets: [
            {
              type: 'bar',
              label: 'Quantity',
              backgroundColor: '#42A5F9',
              data: x.map((item: SoldReport) => item.quantity),
            },
          ],
        };

        this.data = {
          datasets: [
            {
              data: x.map((item: SoldReport) => item.totalSales),
              backgroundColor: [
                '#42A5F5',
                '#66BB6A',
                '#FFA726',
                '#26C6DA',
                '#7E57C2',
                '#008B8B',
                '#ADFF2F',
              ],
              label: 'Total Sales',
            },
          ],
          labels: x.map((item: SoldReport) => item.productName),
        };
      });

    this.stackedOptions = {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}

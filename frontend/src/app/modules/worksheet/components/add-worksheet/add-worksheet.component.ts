import { Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/modules/quotation/services/quotation.service';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';

@Component({
  selector: 'app-add-worksheet',
  templateUrl: './add-worksheet.component.html',
  styleUrls: ['./add-worksheet.component.scss'],
})
export class AddWorksheetComponent implements OnInit {
  constructor(
    private quotationService: QuotationService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    /**TODO: ngOnInit for AddWorksheetComponent */
  }
}

import {MatPaginatorIntl} from '@angular/material';
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel: string = 'Items par page:';
  // nextPageLabel     = 'Page Prochaine';
  // previousPageLabel = 'Page Précedente';

  labelPl() {
    return this.itemsPerPageLabel = 'Lista zadań:';
  }
  labelEn() {
    return this.itemsPerPageLabel = 'Items par page:';
  }
}

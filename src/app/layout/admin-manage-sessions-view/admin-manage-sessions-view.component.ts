import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionServiceService } from 'src/app/core/services/user-service/session-service.service';



import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable/';
import { Session } from 'protractor';
import { User } from 'src/app/core/models/user';



@Component({
  selector: 'app-admin-manage-sessions-view',
  templateUrl: './admin-manage-sessions-view.component.html',
  styleUrls: ['./admin-manage-sessions-view.component.scss']
})
export class AdminManageSessionsViewComponent implements OnInit {

  private title = '';
  private location = '';
  private sessionDate = '';
  private capacity = 0;
  private requirements = '';
  private duration = 0;
  private instructor = 0;
  private description = '';
  rows: Session[];


  columns = [
    {  },
    { prop: 'id' },
    { prop: 'title' },
    { name: 'sessionDate' },
  ];
  temp = [];
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(config: NgbModalConfig, 
              private modalService: NgbModal, 
              private sessionService: SessionServiceService) {
    // customize default values of modals used by this component tree
    
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.sessionService.getAllSessions().subscribe((data: Session[]) => {
      this.rows = data;
      console.log(this.rows); 
      data.forEach((row: Session) => {
        this.sessionService.getAllUsersBySession(row['id']).subscribe((data: User[]) =>{ 
          row['users'] = data;
          this.temp = [...this.rows];
        })
      });
    })
    

  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(this.temp);
    
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
console.log(temp);

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  

  open(content) {
    this.modalService.open(content, { scrollable: true });
  }

  create() {
    let date = this.sessionDate.replace("T"," ");
    console.log(this.sessionDate);
    
    this.sessionService.createSession(this.title, this.location, date, this.capacity, 
    this.requirements, this.duration, this.instructor, this.description).subscribe(data => {
    this.title = '';
    this.location = '';
    this.sessionDate = '';
    this.capacity = 0;
    this.requirements = '';
    this.duration = 0;
    this.instructor = 0;
    this.description = '';
  });}

}



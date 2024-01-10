import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitService } from './unit.service';
import { Unit } from './unit.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
  providers:[UnitService]
})
export class UnitComponent implements OnInit {

  ngOnInit() {
  }
}




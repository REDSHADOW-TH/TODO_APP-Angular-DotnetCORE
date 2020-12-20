import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';
import { TodoService } from '../../Services/todo.service';
import { Note } from '../../Models/NoteModel';
import { Subscriber } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-todo-note',
  templateUrl: './todo-note.component.html',
  styleUrls: ['./todo-note.component.css']
})
export class TodoNoteComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private todo: TodoService
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLogin()) {
      this.router.navigate(['/login']);
    }
    this.getNote();
  }

  test: any[] = [1,2];

  public modalTitle: string = '';

  public title: string = '';
  public text: string = '';

  public noteList: any[] = [];

  public modal: string = '';


  public editId: number = 0;

  openAddModal(): void {
    this.modalTitle = 'Add';
    this.clearModal();
    this.modal = 'add';
    $('#noteModal').modal();
  }

  openEditModal(id: number): void {
    this.editId = id;
    console.log(this.editId);
    this.modalTitle = 'Edit';
    this.clearModal();
    
    const data = this.noteList.filter(i => i.id === id);

    if (data.length) {
      this.title = data[0].title;
      this.text = data[0].textMessage;
    }
    this.modal = 'edit';
    $('#noteModal').modal();
  }

  clearModal(): void {
    this.title = '';
    this.text = '';
  }

  closeAllModal(): void {
    this.clearModal();
    this.modal = '';
    $('#noteModal').modal('hide');
  }

  getNote(): void {
    this.todo.getNote(this.auth.getUserName() ?? '')
      .subscribe((r: any) => {
        if (r.status === 200) {
          this.noteList = r.data;
        }
      });
  }

  addNote(): void {
    if (this.title !== '' && this.text !== '') {
      this.todo.addNote({
        title: this.title, text: this.text, create_by: this.auth.getUserName()?.toString() ?? ''
      })
        .subscribe((r: any) => {
          Swal.fire({
            icon: 'success', title: 'Success', text: 'Add note success', heightAuto: false
          });
          this.getNote();
          this.closeAllModal();
        });
    } else {
      Swal.fire({
        icon: 'warning', title: 'Warning', text: 'Title and Text not empty !', heightAuto: false
      });
    }
  }

  editNote(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm',
      text: 'Edit data ?',
      showCancelButton: true
    }).then(() => {
      console.log('save');
      this.todo.editNote({
        id: this.editId, title: this.title, text: this.text
      }).subscribe((r: any) => {
        if (r.status === 200) {
          Swal.fire({
            icon: 'success', title: 'Success', text: 'Save success', heightAuto: false
          });
          this.getNote();
          this.closeAllModal();
        }
      });
    }).catch(() => {});
  }

  deleteNoteConfirm(seq: number): void {
    const data = this.noteList.filter(i => i.seq === seq);
    Swal.fire({
      icon: 'warning',
      title: 'Confirm',
      text: 'Want to delete => ' + data[0].title,
      showCancelButton: true
    }).then((s) => {
      console.log(s);
      if (s.isConfirmed) {
        this.deleteNote(seq);
      }
    }).catch(() => {});
  }

  deleteNote(seq: number): void {
    this.todo.deleteNote(seq)
      .subscribe((r: any) => {
        if (r.status === 200) {
          Swal.fire({
            icon: 'success', title: 'Success', text: 'Delete success', heightAuto: false
          });
        }
        this.getNote();
      });
  }

  logout(): void {
    if (this.auth.logout()) {
      this.router.navigate(['/login']);
    };
  }

}

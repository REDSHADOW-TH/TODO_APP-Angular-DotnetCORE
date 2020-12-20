import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNoteComponent } from './todo-note.component';

describe('TodoNoteComponent', () => {
  let component: TodoNoteComponent;
  let fixture: ComponentFixture<TodoNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

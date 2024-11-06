import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';
import { DebugElement, input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let commentsService: jasmine.SpyObj<CommentsService>;
  let fixture: ComponentFixture<CommentComponent>;
  let component: CommentComponent;
  let el: DebugElement;
  beforeEach(async () => {
    const commentServiceSpy = jasmine.createSpyObj(CommentsService, [
      'getAllComments',
      'postComment',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [{ provide: CommentsService, useValue: commentServiceSpy }],
    }).compileComponents();

    // injecting service
    commentsService = TestBed.inject(
      CommentsService
    ) as jasmine.SpyObj<CommentsService>;

    // get component with view and ts file
    fixture = TestBed.createComponent(CommentComponent);

    // ts object
    component = fixture.componentInstance;

    // view element
    el = fixture.debugElement;
  });

  it('should have input and button present', () => {
    // using native Element
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();

    // using debug element b jasmine
    expect(el.query(By.css('input'))).toBeTruthy();
  });

  it('should load comments on component initialization', () => {
    const comments = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' },
    ];

    // custom return value to method
    commentsService.getAllComments.and.returnValue(of(comments));

    // detect changes on view when data is received by the service
    // calls all life cycle method of a component
    fixture.detectChanges();

    expect(el.queryAll(By.css('li')).length).toBe(2);
  });

  it('should display alert if comment input is empty on submission', () => {
    // alert is called in handleSubmit
    spyOn(window, 'alert');
    component.text = '';
    component.handleSubmit();

    expect(window.alert).toHaveBeenCalledOnceWith('Please add a comment');

    // expecting postComment method is not called
    expect(commentsService.postComment).not.toHaveBeenCalled();
  });



  // TRICKY:
  it('should add comment in UI when user types and click on post btn', () => {
    const comment = { id: 1, text: 'New Comment By Tester' };

    commentsService.getAllComments.and.returnValue(of([]));

    console.log(component.allComments);

    fixture.detectChanges();

    // we have service variable so using without spy
    commentsService.postComment.and.returnValue(of(comment));
    spyOn(Date, 'now').and.returnValue(1);

    // simulate user typing a comment
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputElement.value = comment.text;

    // dispatch input event of input to execute handleInput function of it
    inputElement.dispatchEvent(new Event('input'));

    // simulate user clicking on btn
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    fixture.detectChanges();

    console.log(component.allComments);

    const commentsLiElements = fixture.nativeElement.querySelectorAll('li');

    expect(commentsLiElements.length).toBe(1);
  });
});

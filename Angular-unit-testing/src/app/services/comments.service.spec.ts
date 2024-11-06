import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_URL } from '../utils/resources';
import COMMENTS_DATA from '../../../db.json';

describe('CommentService', () => {
  let commentService: CommentsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    commentService = TestBed.inject(CommentsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should get all comments', () => {
    // call get all comments to test it
    // data is provided by flushing by us
    commentService.getAllComments().subscribe((comments: any) => {
      // checks comments gets a value
      expect(comments).toBeTruthy();
    });

    // gets the mock req object and check that it is called once
    const req = httpTesting.expectOne(`${API_URL}/comments`);

    // checks for req method is GET
    expect(req.request.method).toEqual('GET');

    // faking api calls
    // gives response for the req as out data
    req.flush(COMMENTS_DATA.comments);
  });

  it('should give a comment by ID', () => {
    const ID = 1;

    // call get all comments to test it
    // data is provided by flushing by us
    commentService.getCommentById(ID).subscribe((comment: any) => {
      // checks comments gets a value
      expect(comment).toBeTruthy();
      expect(Number(comment.id)).toEqual(ID);
    });

    // gets the mock req object and check that it is called once
    const req = httpTesting.expectOne(`${API_URL}/comments/${ID}`);

    // checks for req method is GET
    expect(req.request.method).toEqual('GET');

    // faking api calls
    // gives response for the req as out data
    req.flush(COMMENTS_DATA.comments[ID - 1]);
  });

  it('should post a comment', () => {
    const commentData = {
      id: 101,
      text: 'comment added by testing',
    };

    // call get all comments to test it
    // data is provided by flushing by us
    commentService.postComment(commentData).subscribe((comment: any) => {
      // checks comments gets a value
      expect(comment).toBeTruthy();
      expect(Number(comment.id)).toEqual(commentData.id);
    });

    // gets the mock req object and check that it is called once
    const req = httpTesting.expectOne(`${API_URL}/comments`);

    // checks for req method is GET
    expect(req.request.method).toEqual('POST');

    // faking api calls
    // gives response for the req as out data
    req.flush(commentData);
  });

  it('should give error if post a comment fails', () => {
    const commentData = {
      id: 102,
      text: 'comment added by testing',
    };

    // call get all comments to test it
    // data is provided by flushing by us
    commentService.postComment(commentData).subscribe({
      next: (comment: any) => {
        // failing test case when next method is called
        fail('save comment should have failed');
      },
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
      },
    });

    // gets the mock req object and check that it is called once. i will not error of more than one req is made cause it is expecting at least one is made
    const req = httpTesting.expectOne(`${API_URL}/comments`);

    // checks for req method is GET
    expect(req.request.method).toEqual('POST');

    // faking api calls
    // gives response for the req as out data
    // passing status to get error as 500
    req.flush('FAILED!!', { status: 500, statusText: 'Internal server error' });
  });

  afterEach(() => {
    // checks that all request are handled and no extra request is made
    httpTesting.verify();
  });
});

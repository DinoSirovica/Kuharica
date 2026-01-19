import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  @Input() recipeId: any;
  comments: any[] = [];
  newCommentText: string = '';
  activeUser: any = null;

  constructor(
    private apiService: ApiServiceService,
    private activeUserService: ActiveUserService
  ) { }

  ngOnInit(): void {
    this.activeUserService.activeUser$.subscribe(user => {
      this.activeUser = user;
    });
    this.loadComments();
  }

  loadComments() {
    if (this.recipeId) {
      this.apiService.getComments(this.recipeId).subscribe(data => {
        this.comments = data;
      });
    }
  }

  addComment() {
    if (!this.newCommentText.trim()) return;

    if (this.activeUser && this.recipeId) {
      this.apiService.addComment(this.recipeId, this.activeUser.user_id, this.newCommentText)
        .subscribe(newComment => {
          this.comments.unshift(newComment);
          this.newCommentText = '';
        });
    }
  }

  canEdit(comment: any): boolean {
    return this.activeUser && this.activeUser.user_id === comment.korisnik_id;
  }

  canDelete(comment: any): boolean {
    return this.activeUser && (this.activeUser.user_id === comment.korisnik_id || this.activeUser.role === 'admin');
  }

  startEdit(comment: any) {
    comment.isEditing = true;
    comment.editText = comment.tekst;
  }

  cancelEdit(comment: any) {
    comment.isEditing = false;
  }

  saveEdit(comment: any) {
    if (!comment.editText.trim()) return;

    this.apiService.updateComment(comment.id, this.activeUser.user_id, comment.editText)
      .subscribe(() => {
        comment.tekst = comment.editText;
        comment.isEditing = false;
      });
  }

  deleteComment(comment: any) {
    console.log('Delete button clicked for comment:', comment.id);
    console.log('Current activeUser:', this.activeUser);

    if (!this.activeUser) {
      alert('Error: User not identified. Please re-login.');
      return;
    }

    if (confirm('Jeste li sigurni da želite obrisati ovaj komentar?')) {
      console.log('User confirmed delete. Calling API...');
      this.apiService.deleteComment(comment.id, this.activeUser.user_id)
        .subscribe({
          next: (response) => {
            console.log('API Delete Success:', response);
            this.comments = this.comments.filter(c => c.id !== comment.id);
          },
          error: (err) => {
            console.error('API Delete Failed:', err);
            alert('Brisanje nije uspjelo. Pogledajte konzolu za detalje.');
          }
        });
    } else {
      console.log('User cancelled delete dialog');
    }
  }
}

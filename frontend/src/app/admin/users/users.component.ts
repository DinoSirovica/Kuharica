import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {
    users: any[] = [];
    filteredUsers: any[] = [];
    searchTerm: string = '';

    constructor(
        private apiService: ApiServiceService
    ) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        this.apiService.getUsers().subscribe(
            (response: any) => {
                this.users = response.data;
                this.filterUsers();
            },
            (error) => {
                console.error('Error fetching users:', error);
                alert('Neuspješno dohvaćanje korisnika');
            }
        );
    }

    filterUsers() {
        if (!this.searchTerm) {
            this.filteredUsers = this.users;
        } else {
            const lowerTerm = this.searchTerm.toLowerCase();
            this.filteredUsers = this.users.filter(user =>
                user.username.toLowerCase().includes(lowerTerm) ||
                user.email.toLowerCase().includes(lowerTerm)
            );
        }
    }

    toggleBlockUser(user: any) {
        const newStatus = !user.is_blocked;
        this.apiService.blockUser(user.user_id, newStatus).subscribe(
            (response: any) => {
                user.is_blocked = newStatus; // Optimistic update
                alert(`Korisnik ${newStatus ? 'blokiran' : 'odblokiran'}`);
            },
            (error) => {
                console.error('Error blocking user:', error);
                alert('Neuspješna akcija');
            }
        );
    }

    deleteUser(user: any) {
        if (!user || !user.user_id) {
            alert('Greška: Nedostaje ID korisnika');
            return;
        }

        if (confirm(`Jeste li sigurni da želite obrisati korisnika ${user.username}? Ova akcija je nepovratna.`)) {
            this.apiService.deleteUser(user.user_id).subscribe(
                (response: any) => {
                    this.users = this.users.filter(u => u.user_id !== user.user_id);
                    this.filterUsers();
                    alert('Korisnik obrisan');
                },
                (error) => {
                    console.error('Error deleting user:', error);
                    alert(`Neuspješno brisanje: ${error.error?.error || error.message || 'Nepoznata greška'}`);
                }
            );
        }
    }
}

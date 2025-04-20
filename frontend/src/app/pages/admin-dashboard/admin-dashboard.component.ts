import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  isLoading = false;
  toys: any[] = [];
  searchTerm = '';
  dataSource: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'createdAt', 'actions'];

  onDelete(toy: any): void {
    // Implementation will be added later
    console.log('Delete toy', toy);
  }
}

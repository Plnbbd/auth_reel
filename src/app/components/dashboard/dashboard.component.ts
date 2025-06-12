import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Document {
  id: number;
  name: string;
  category: string;
  size: string;
  modified: string;
  author: string;
  status: string;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatToolbarModule
  ],
  template: `
    <div class="dashboard-container fade-in-up">
      <!-- Header -->
      <mat-card class="header-card glass-card">
        <div class="header-content">
          <div class="header-info">
            <h1>Tableau de Bord GED</h1>
            <p>Gestion centralisée des documents ADCSA</p>
          </div>
          <div class="header-actions">
            <button mat-icon-button class="action-btn">
              <mat-icon>notifications</mat-icon>
            </button>
            <button mat-icon-button class="action-btn">
              <mat-icon>settings</mat-icon>
            </button>
            <button mat-icon-button class="logout-btn" (click)="logout()">
              <mat-icon>logout</mat-icon>
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card *ngFor="let stat of stats" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-label">{{stat.label}}</p>
              <p class="stat-value">{{stat.value}}</p>
            </div>
            <div class="stat-icon" [ngClass]="stat.color">
              <mat-icon>{{stat.icon}}</mat-icon>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Main Content -->
      <mat-card class="main-card glass-card">
        <!-- Toolbar -->
        <div class="toolbar">
          <div class="search-section">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Rechercher des documents...</mat-label>
              <input matInput [(ngModel)]="searchQuery" placeholder="Rechercher des documents...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="category-select">
              <mat-label>Catégorie</mat-label>
              <mat-select [(value)]="selectedCategory">
                <mat-option value="all">Toutes catégories</mat-option>
                <mat-option *ngFor="let category of categories.slice(1)" [value]="category">
                  {{category}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          
          <div class="action-buttons">
            <button mat-raised-button color="primary" class="action-btn-primary">
              <mat-icon>upload</mat-icon>
              Télécharger
            </button>
            <button mat-raised-button color="accent" class="action-btn-accent">
              <mat-icon>add</mat-icon>
              Nouveau
            </button>
          </div>
        </div>

        <!-- Documents Table -->
        <div class="table-container">
          <table mat-table [dataSource]="documents" class="documents-table">
            <!-- Document Column -->
            <ng-container matColumnDef="document">
              <th mat-header-cell *matHeaderCellDef>Document</th>
              <td mat-cell *matCellDef="let doc">
                <div class="document-cell">
                  <div class="doc-icon">
                    <mat-icon>description</mat-icon>
                  </div>
                  <div class="doc-info">
                    <p class="doc-name">{{doc.name}}</p>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Category Column -->
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Catégorie</th>
              <td mat-cell *matCellDef="let doc">{{doc.category}}</td>
            </ng-container>

            <!-- Size Column -->
            <ng-container matColumnDef="size">
              <th mat-header-cell *matHeaderCellDef>Taille</th>
              <td mat-cell *matCellDef="let doc">{{doc.size}}</td>
            </ng-container>

            <!-- Modified Column -->
            <ng-container matColumnDef="modified">
              <th mat-header-cell *matHeaderCellDef>Modifié</th>
              <td mat-cell *matCellDef="let doc">{{doc.modified}}</td>
            </ng-container>

            <!-- Author Column -->
            <ng-container matColumnDef="author">
              <th mat-header-cell *matHeaderCellDef>Auteur</th>
              <td mat-cell *matCellDef="let doc">
                <div class="author-cell">
                  <div class="author-avatar">
                    <mat-icon>person</mat-icon>
                  </div>
                  <span>{{doc.author}}</span>
                </div>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let doc">
                <mat-chip [ngClass]="getStatusClass(doc.status)">
                  {{doc.status}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let doc">
                <div class="action-buttons-cell">
                  <button mat-icon-button class="action-icon-btn view">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button class="action-icon-btn download">
                    <mat-icon>download</mat-icon>
                  </button>
                  <button mat-icon-button class="action-icon-btn edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button class="action-icon-btn delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <p class="pagination-info">Affichage de 1 à 3 sur 1,247 documents</p>
          <div class="pagination-controls">
            <button mat-button>Précédent</button>
            <button mat-raised-button color="primary">1</button>
            <button mat-button>2</button>
            <button mat-button>Suivant</button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-card {
      padding: 24px !important;
      margin-bottom: 32px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-info h1 {
      font-size: 28px;
      font-weight: 800;
      color: white;
      margin-bottom: 8px;
    }

    .header-info p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }

    .logout-btn {
      background: rgba(244, 67, 54, 0.2) !important;
      color: white !important;
      border: 1px solid rgba(244, 67, 54, 0.3) !important;
    }

    .logout-btn:hover {
      background: rgba(244, 67, 54, 0.3) !important;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      padding: 24px !important;
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      color: #666;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 800;
      color: #333;
      margin: 0;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      color: white;
      font-size: 24px;
    }

    .stat-icon.blue {
      background: linear-gradient(145deg, #2196F3, #1976D2);
    }

    .stat-icon.green {
      background: linear-gradient(145deg, #4CAF50, #388E3C);
    }

    .stat-icon.orange {
      background: linear-gradient(145deg, #FF9800, #F57C00);
    }

    .stat-icon.purple {
      background: linear-gradient(145deg, #9C27B0, #7B1FA2);
    }

    .main-card {
      padding: 0 !important;
      overflow: hidden;
    }

    .toolbar {
      padding: 24px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .search-section {
      display: flex;
      gap: 16px;
      flex: 1;
      min-width: 300px;
    }

    .search-field {
      flex: 1;
      min-width: 300px;
    }

    .category-select {
      min-width: 200px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .action-btn-primary, .action-btn-accent {
      padding: 12px 24px !important;
      font-weight: 600 !important;
    }

    .table-container {
      overflow-x: auto;
    }

    .documents-table {
      width: 100%;
    }

    .document-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .doc-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(145deg, #2196F3, #1976D2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .doc-icon mat-icon {
      color: white;
      font-size: 20px;
    }

    .doc-name {
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .author-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .author-avatar {
      width: 32px;
      height: 32px;
      background: linear-gradient(145deg, #4CAF50, #388E3C);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .author-avatar mat-icon {
      color: white;
      font-size: 16px;
    }

    .status-validated {
      background: #E8F5E8 !important;
      color: #2E7D32 !important;
    }

    .status-draft {
      background: #F5F5F5 !important;
      color: #616161 !important;
    }

    .status-review {
      background: #FFF8E1 !important;
      color: #F57C00 !important;
    }

    .action-buttons-cell {
      display: flex;
      gap: 4px;
    }

    .action-icon-btn {
      width: 32px !important;
      height: 32px !important;
      line-height: 32px !important;
      border-radius: 8px !important;
    }

    .action-icon-btn mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .action-icon-btn.view:hover {
      background: rgba(33, 150, 243, 0.1) !important;
      color: #2196F3 !important;
    }

    .action-icon-btn.download:hover {
      background: rgba(76, 175, 80, 0.1) !important;
      color: #4CAF50 !important;
    }

    .action-icon-btn.edit:hover {
      background: rgba(255, 152, 0, 0.1) !important;
      color: #FF9800 !important;
    }

    .action-icon-btn.delete:hover {
      background: rgba(244, 67, 54, 0.1) !important;
      color: #F44336 !important;
    }

    .table-row:hover {
      background: #f5f5f5;
    }

    .pagination {
      padding: 24px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pagination-info {
      color: #666;
      margin: 0;
    }

    .pagination-controls {
      display: flex;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .search-section {
        flex-direction: column;
      }

      .action-buttons {
        justify-content: center;
      }

      .pagination {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class DashboardComponent {
  searchQuery = '';
  selectedCategory = 'all';
  
  displayedColumns: string[] = ['document', 'category', 'size', 'modified', 'author', 'status', 'actions'];
  
  documents: Document[] = [
    {
      id: 1,
      name: 'Rapport_Securite_Q1_2025.pdf',
      category: 'Sécurité',
      size: '2.4 MB',
      modified: '2025-01-15',
      author: 'Marie Dubois',
      status: 'Validé'
    },
    {
      id: 2,
      name: 'Procedures_Embarquement.docx',
      category: 'Procédures',
      size: '856 KB',
      modified: '2025-01-14',
      author: 'Jean Kamdem',
      status: 'Brouillon'
    },
    {
      id: 3,
      name: 'Maintenance_Pistes_Janvier.xlsx',
      category: 'Maintenance',
      size: '1.2 MB',
      modified: '2025-01-13',
      author: 'Paul Mvondo',
      status: 'En révision'
    }
  ];

  categories = ['all', 'Sécurité', 'Procédures', 'Maintenance', 'Finances', 'RH'];

  stats: Stat[] = [
    { label: 'Documents Total', value: '1,247', icon: 'description', color: 'blue' },
    { label: 'Nouveaux ce mois', value: '89', icon: 'add', color: 'green' },
    { label: 'En attente', value: '23', icon: 'schedule', color: 'orange' },
    { label: 'Archivés', value: '456', icon: 'folder', color: 'purple' }
  ];

  constructor(private router: Router) {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Validé':
        return 'status-validated';
      case 'Brouillon':
        return 'status-draft';
      case 'En révision':
        return 'status-review';
      default:
        return '';
    }
  }

  logout() {
    this.router.navigate(['/session-expired']);
  }
}
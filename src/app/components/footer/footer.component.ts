import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>À propos d'ADCSA</h3>
          <ul>
            <li><a href="#">Qui sommes-nous</a></li>
            <li><a href="#">Carrières</a></li>
            <li><a href="#">Presse</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Assistance</h3>
          <ul>
            <li><a href="#">Centre d'aide</a></li>
            <li><a href="#">Contacter le support</a></li>
            <li><a href="#">Accessibilité</a></li>
            <li><a href="#">Sécurité</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Légal</h3>
          <ul>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Mentions légales</a></li>
          </ul>
        </div>
      </div>

      <mat-divider></mat-divider>

      <div class="footer-bottom">
        <div class="copyright">
          © 2024 ADCSA. Tous droits réservés.
        </div>
        <div class="footer-links">
          <a href="#">Conditions d'utilisation</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Préférences de cookies</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #232f3e;
      color: #fff;
      padding: 40px 0 20px;
      width: 100%;
      position: relative;
      margin-top: auto;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      padding: 0 20px;
    }

    .footer-section h3 {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 10px;
    }

    .footer-section ul li a {
      color: #ddd;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s ease;
    }

    .footer-section ul li a:hover {
      color: #fff;
      text-decoration: underline;
    }

    mat-divider {
      border-color: #3a4553;
      margin: 20px 0;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .copyright {
      color: #ddd;
    }

    .footer-links {
      display: flex;
      gap: 20px;
    }

    .footer-links a {
      color: #ddd;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-links a:hover {
      color: #fff;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }

      .footer-links {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class FooterComponent {} 
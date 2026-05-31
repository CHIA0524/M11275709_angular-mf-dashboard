import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly quickFacts = [
    { icon: 'insights', label: '洞察與配置' },
    { icon: 'query_stats', label: '即時趨勢分析' },
    { icon: 'architecture', label: '獨立 Remote 預覽' }
  ];
}

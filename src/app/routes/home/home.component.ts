import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const texts = [
      'design graphics.',
      'take photographs.',
      'design websites.',
      'develop UX plans',
    ];

    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];
      letter = currentText.slice(0, (index += 1));

      document.querySelector('.typing').textContent = letter;
      if (letter.length === currentText.length) {
        count += 1;
        index = 0;
      }
      setTimeout(type, 200);
    })();
  }
}

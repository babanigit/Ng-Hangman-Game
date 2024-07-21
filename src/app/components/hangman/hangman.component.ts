import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss',
})
export class HangmanComponent implements OnInit, OnChanges {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';

  constructor(private hangmanService: HangmanService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['guesses'].currentValue &&
      changes['guesses'].currentValue.length &&
      changes['guesses'].currentValue != changes['guesses'].previousValue
    ) {
      console.log(changes['guesses'].currentValue)
    }
  }

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((res) => {
      this.questions = res.items;
      this.category = res.category;
      this.pickNewQuestions();
    });
  }

  //push the key to guesses array
  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    // this.guesses.push(letter);
    this.guesses= [...this.guesses, letter];
  }

  dummyClick() {
    let key = prompt('enter the key') || '';
    this.guess(key);
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestions();
  }

  pickNewQuestions() {
    const randomIndex = Math.floor(Math.random() * this.questions.length); //to get random index number
    this.question = this.questions[randomIndex];
    console.log(this.question);
  }
}

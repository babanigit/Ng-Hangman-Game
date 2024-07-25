import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';
import { Subscription } from 'rxjs';

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

  loadingState = false;
  private loadingSubscription: Subscription | undefined;


  constructor(private hangmanService: HangmanService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['guesses'].currentValue &&
      changes['guesses'].currentValue.length &&
      changes['guesses'].currentValue != changes['guesses'].previousValue
    ) {
      console.log(changes['guesses'].currentValue);
    }
  }

  ngOnInit(): void {
    // Subscribe to loading state changes
    this.loadingSubscription = this.hangmanService.getLoadingState().subscribe((state) => {
      this.loadingState = state;
    });

    // Fetch questions initially
    this.fetchQuestions();

  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchQuestions() {
    this.hangmanService.getQuestions().subscribe((res: any) => {
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
    this.guesses = [...this.guesses, letter];
    console.log(this.guesses);
  }

  dummyClick() {
    // get questions with loading latencies
    this.hangmanService.getQuestions().subscribe((res:any) => {
      this.questions = res.items;
      this.category = res.category;
      this.pickNewQuestions();
    });

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

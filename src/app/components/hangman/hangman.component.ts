import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent implements OnInit {

  question:string= '';
  questions:string[]= [];
  guesses:string[] =[];
  category:string='';

  constructor(private hangmanService:HangmanService) {}

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((res)=> {
      this.questions= res.items;
      this.category=res.category;
      this.pickNewQuestions();
    })
  }

  pickNewQuestions() {
    console.log("data fetched")
    // console.log( "this is quesitons ", this.questions)
  }

}

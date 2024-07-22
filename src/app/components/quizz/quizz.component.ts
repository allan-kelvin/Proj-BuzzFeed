import { Component } from '@angular/core';
import quizz_questions from "../../assets/data/quizz_questions.json"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title:string = "";

  questions:any
  questionSelected:any

  resp:string[] = [];
  respSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number=0;

  finished:boolean = false;

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChosse(value:string){
    this.resp.push(value);
    this.nextStep();
  }

    async nextStep(){
    this.questionIndex+=1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const respFinal:string = await this.checkResult(this.resp)
      this.finished = true;
      this.respSelected = quizz_questions.results[respFinal as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(resp:string[]){
    const resultFinal = resp.reduce((previous, current, i, arr)=>{
      if (arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length 
        ){
        return previous
      }else{
        return current
      }
    });
    return resultFinal
  }

}

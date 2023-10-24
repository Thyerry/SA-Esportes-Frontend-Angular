import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
})
export class SenderComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  apiErrorMessages: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.messageForm = this.formBuilder.group({
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  pickRandomString() {
    if (Math.random() * 10 > 5) this.generateRandomString();
    else this.generateValidString();
  }

  private generateRandomString() {
    const length = Math.floor(Math.random() * 6) + 15;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&_';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    this.messageForm.get('message')?.setValue(result);
  }

  private generateValidString() {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '@#$%&_';

    let message = '';

    for (let i = 0; i < 2; i++) {
      message += lowerCaseChars.charAt(
        Math.floor(Math.random() * lowerCaseChars.length)
      );
    }

    for (let i = 0; i < 5; i++) {
      message += upperCaseChars.charAt(
        Math.floor(Math.random() * upperCaseChars.length)
      );
    }

    message += 'AAAA';

    for (let i = 0; i < 2; i++) {
      message += specialChars.charAt(
        Math.floor(Math.random() * specialChars.length)
      );
    }

    const allChars =
      lowerCaseChars + upperCaseChars + '0123456789' + specialChars;
    while (message.length < 15) {
      message += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    message = message
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    this.messageForm.get('message')?.setValue(message);
  }

  submitForm() {
    this.submitted = true;
    this.showSuccessMessage = true;
    this.apiErrorMessages = [];

    if (this.messageForm.valid) {
      const message: Message = {
        content: this.messageForm.get('message')?.value,
      };
      this.messageService.sendMessage(message).subscribe({
        next: () => {
          this.messageForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (error) => {
          if (typeof error.error !== 'object') {
            this.apiErrorMessages.push(error.error);
          }
        },
      });
    }
  }
}

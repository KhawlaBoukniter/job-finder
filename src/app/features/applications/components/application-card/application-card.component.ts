import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationItem, ApplicationStatus } from '../../models/application.model';

@Component({
    selector: 'app-application-card',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="bg-white shadow rounded-lg p-6 border border-zinc-200">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-medium text-zinc-900">{{ application.title }}</h3>
          <p class="text-sm text-zinc-500">{{ application.company }} • {{ application.location }}</p>
        </div>
        <select 
            [ngModel]="application.status" 
            (ngModelChange)="onStatusChange($event)"
            [ngClass]="{
                'bg-yellow-100 text-yellow-800 border-yellow-200': application.status === 'en_attente',
                'bg-green-100 text-green-800': application.status === 'accepte',
                'bg-red-100 text-red-800': application.status === 'refuse'
            }"
            class="ml-4 block w-32 pl-3 pr-10 py-1 text-xs font-medium border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md cursor-pointer">
            <option value="en_attente">En attente</option>
            <option value="accepte">Accepté</option>
            <option value="refuse">Refusé</option>
        </select>
      </div>

      <div class="mt-4">
        <label for="notes-{{application.id}}" class="block text-xs font-medium text-zinc-700 mb-1">Notes</label>
        <div class="flex gap-2">
            <textarea 
                id="notes-{{application.id}}"
                [(ngModel)]="notes"
                rows="2"
                class="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                placeholder="Ajouter une note..."></textarea>
            <button 
                (click)="onSaveNotes()"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 self-end">
                Ok
            </button>
        </div>
      </div>
      
      <div class="mt-4 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex space-x-4">
            <a [href]="application.url" target="_blank" class="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Voir l'offre
            </a>
        </div>
        
        <button (click)="onDelete()" class="text-red-600 hover:text-red-800 text-sm font-medium">
            Supprimer
        </button>
      </div>
    </div>
  `
})
export class ApplicationCardComponent implements OnInit {
    @Input({ required: true }) application!: ApplicationItem;
    @Output() delete = new EventEmitter<number | string>();
    @Output() updateStatus = new EventEmitter<{ id: number | string, status: ApplicationStatus }>();
    @Output() updateNotes = new EventEmitter<{ id: number | string, notes: string }>();

    notes: string = '';

    ngOnInit() {
        this.notes = this.application.notes || '';
    }

    onDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce suivi ?')) {
            this.delete.emit(this.application.id);
        }
    }

    onStatusChange(newStatus: ApplicationStatus) {
        if (this.application.id) {
            this.updateStatus.emit({ id: this.application.id, status: newStatus });
        }
    }

    onSaveNotes() {
        if (this.application.id) {
            this.updateNotes.emit({ id: this.application.id, notes: this.notes });
        }
    }
}

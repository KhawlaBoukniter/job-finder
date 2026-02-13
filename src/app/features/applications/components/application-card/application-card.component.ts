import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationItem, ApplicationStatus } from '../../models/application.model';

@Component({
    selector: 'app-application-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white shadow rounded-lg p-6 border border-zinc-200">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-medium text-zinc-900">{{ application.title }}</h3>
          <p class="text-sm text-zinc-500">{{ application.company }} • {{ application.location }}</p>
        </div>
        <span [ngClass]="{
          'bg-yellow-100 text-yellow-800': application.status === 'en_attente',
          'bg-green-100 text-green-800': application.status === 'accepte',
          'bg-red-100 text-red-800': application.status === 'refuse'
        }" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
          {{ application.status.replace('_', ' ') }}
        </span>
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
export class ApplicationCardComponent {
    @Input({ required: true }) application!: ApplicationItem;
    @Output() delete = new EventEmitter<number | string>();

    onDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce suivi ?')) {
            this.delete.emit(this.application.id);
        }
    }
}

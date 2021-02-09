import { Injectable } from '@angular/core';
import { IBar } from '../share/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
    providedIn: 'root'
})
export class BarDbService {
    auxBar: IBar;
    auxBarList: IBar[] = [];
    constructor(private storage: Storage) { }
    // Stores a value
    setItem(reference: string, value: IBar) {
        this.storage.set(reference, {
            id: value.id, name: value.name, rating:
                value.rating, shortDescription: value.shortDescription, image: value.image, description:
                value.description
        })
            .then(
                (data) => console.log('Stored first item!', data),
                error => console.error('Error storing item', error)
            );
    }
    // Gets a stored item
    getItem(reference): Promise<IBar> {
        return this.storage.get(reference);
    }
    // check if it is empty
    empty() {
        return this.storage.keys()
            .then(
                (data) => { return true },
                error => { return false }
            );
    }
    // Retrieving all keys
    keys(): Promise<string[]> {
        return this.storage.keys();
    }
    // Retrieving all values
    getAll(): Promise<IBar[]> {
        return this.storage.keys().then((k) => {
            k.forEach(element => {
                this.getItem(element).then(
                    (data: IBar) => this.auxBarList.push(data)
                );
            });
            return this.auxBarList;
        });
    }
    // Removes a single stored item
    remove(reference: string) {
        this.storage.remove(reference)
            .then(
                data => console.log(data),
                error => console.error(error)
            );
    }
    // Removes all stored values.
    clear() {
        this.storage.clear()
            .then(
                data => console.log(data),
                error => console.error(error)
            );
    }
}

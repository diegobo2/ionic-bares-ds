import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
providedIn: 'root'
})

export class BarcrudService {
constructor(
private firestore: AngularFirestore
) { }
create_bar(record) {
return this.firestore.collection('Bars').add(record);
}
read_bar() {
return this.firestore.collection('Bars').snapshotChanges();
}
update_bar(recordID, record) {
this.firestore.doc('Bars/' + recordID).update(record);
}
delete_bar(record_id) {
this.firestore.doc('Bars/' + record_id).delete();
}
}

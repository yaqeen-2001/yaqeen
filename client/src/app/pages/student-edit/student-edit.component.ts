// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { StudentService } from '../../services/student.service';
// Import Models
import { Student } from '../../domain/tasktwo_db/student';

// START - USED SERVICES
/**
* studentService.create
*	@description CRUD ACTION create
*
* studentService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* studentService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* studentService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: Student;
    model: Student;
    formValid: Boolean;

    constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Student();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.studentService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
        });
    }


    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean, item: Student): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.studentService.update(item).subscribe(data => this.goBack());
            } else {
                this.studentService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}




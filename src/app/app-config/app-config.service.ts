import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class AppConfigService {

	// set default app config
	private appConfig: any = {
		"status": [
			{
				"id": "active",
				"itemName": "Active"
			},
			{
				"id": "inactive",
				"itemName": "Inactive"
			}
		],
		"size": [
			{
			  "id":"1",
			  "itemName":"H1"
			},
			{
			  "id":"2",
			  "itemName":"H2"
			}
		],
		"complainStatus": [
			{
				"id": "New",
				"itemName": "New"
			},
			{
				"id": "Open",
				"itemName": "Open"
			},
			{
				"id": "Inprogress",
				"itemName": "Inprogress"
			},
			{
				"id": "Close",
				"itemName": "Close"
			}
		],
		"priority" : [
			{
				"id": "High",
				"itemName": "High"
			},
			{
				"id": "Medium",
				"itemName": "Medium"
			},
			{
				"id": "Low",
				"itemName": "Low"
			},
		],
		"role": [
			{
				"id": "Writer",
				"itemName": "Writer"
			},
			{
				"id": "Admin",
				"itemName": "Admin"
			}
		],
		"platForm": [
			{
				"id": "iOS",
				"itemName": "iOS"
			},
			{
				"id": "Android",
				"itemName": "Android"
			}
		],
		"messageType": [
			{
				"id": "Text",
				"itemName": "Text"
			},
			{
				"id": "Image",
				"itemName": "Image"
			}
    	],
		"allowedLimitRecord": [
			10,
			25,
			50,
			100
		],
		"defaultURL" : "../../../../assets/images/upload-image.png",
		"user" : "../../../../assets/images/user.jpg",
		"mobileNumberPattern": "^(0)[0-9]{9}$",
		"dialog": {
			"success": {
				"save": {
					"title": "Success!",
					"content": "Your data has been saved successfully.",
					"theme": "success"
				},
				"create": {
					"title": "Success!",
					"content": "Your data has been added successfully.",
					"theme": "success"
				},
				"update": {
					"title": "Success!",
					"content": "Your data has been updated successfully.",
					"theme": "success"
				},
				"upload": {
					"title": "Success!",
					"content": "Your data has been uploaded successfully.",
					"theme": "success"
				},
				"deleted": {
					"title": "Success!",
					"content": "Your data has been deleted successfully.",
					"theme": "success"
				},
				"export": {
					"title": "Success!",
					"content": "Your data has been exported successfully.",
					"theme": "success"
				},
				"import": {
					"title": "Success!",
					"content": "Your data has been imported successfully.",
					"theme": "success"
				}
			},
			"warning": {
				"confirmDelete": {
					"title": "Are you sure!",
					"text": "You want to delete this data?",
					"type": "warning",
					"showCancelButton": true,
					"confirmButtonColor": "#3085d6",
					"cancelButtonColor": "#d33",
					"confirmButtonText": "Yes, delete it!"
				},
				"fieldIsRequired": {
					"title": "Field is required!",
					"text": "You have left a field empty and a value must be entered.",
					"type": "warning",
					"showCancelButton": false,
					"confirmButtonColor": "#3085d6",
					"confirmButtonText": "Close"
				},
				"search": {
					"title": "Field is required!",
					"text": "Please specify at least one filter.",
					"type": "warning",
					"showCancelButton": false,
					"confirmButtonColor": "#3085d6",
					"confirmButtonText": "Close"
				}
			},
			"error": {
				"save": {
					"title": "Error!",
					"text": "Something wrong, Please try again.",
					"type": "error",
					"confirmButtonText": "Close"
				}
			}
		}
	}

	constructor(private http: HttpClient) { }

	getConfig() {
		return this.appConfig;
	}
}

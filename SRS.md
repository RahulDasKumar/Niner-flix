# Software Requirements Specification Document

This serves as a template for each projects' Software Requirements Specification (SRS) document. When filling this out, you will be required to create user stories, use cases, requirements, and a glossary of terms relevant to your project. Each group member must contribute to every section, so it is crucial that your group's GitHub repository shows a commit history that reflects the work of each group member. It is highly recommended that you create separate branches for each member, but since this is one single document, you will need to manually merge the branches together. It is also advisable to have multiple working versions of this document (named separately) so that one person can compile the final SRS document from the multiple working versions. Ultimately, how you go about managing this is up to you, but consistent formatting, clear commit messages, and a thorough commit history with contributions from each group member are required.

Fill the document out following the guidelines listed in each section. Maintain [proper Markdown syntax](https://www.markdownguide.org/basic-syntax/) and be sure that your group has a `main` branch with this document and the entire [template repository codebase](https://github.com/david-gary/onlineStoreTemplate) either forked or downloaded and copied into your group's repository. If you have arranged to use a different codebase as a template, you do not need to have the original template included, but a `main` branch is still required.

## Group Members

* [Matthew Young](mailto:myoun101@uncc.edu)
* [Rahul Das](mailto:rdas6@uncc.edu)
* [Akhil Adusumilli](mailto:aadusumi@uncc.edu)
* [Artem Dyadchenko](adyadche@uncc.edu)

## Revisions

When a change is made to the document, a new revision should be created. The revision should be added to the table below with all information filled out.

| Version | Date | Description | Author | Reviewed By |
| --- | --- | --- | --- | --- |
| 1.0 | 03/22/23 | Initial draft | [David Gary](mailto:dgary9@uncc.edu)      | [David Gary](mailto:dgary@uncc.edu)       |
| 1.1 | 03/23/23 | Added Name    | [Matthew Young](mailto:myoun101@uncc.edu) | [Matthew Young](mailto:myoun101@uncc.edu) | 
| 1.2 | 03/24/23 | Added Name    | [Rahul-Das](mailto:rdas6@uncc.edu)        |    [Rahul-Das](mailto:rdas6@uncc.edu)     |
| 1.3 | 03/29/23 | Added Requirements    | [Rahul-Das](mailto:rdas6@uncc.edu)        |    [Rahul-Das](mailto:rdas6@uncc.edu)     |
| 1.4 | 03/30/23 | Fixing Stuff    | [Matthew Young](mailto:myoun101@uncc.edu) | [Matthew Young](mailto:myoun101@uncc.edu) | 
| 1.5 | 03/30/23 | Added Name   | [Akhil Adusumilli](mailto:aadusumi@uncc.edu) | [Akhil Adusumilli](mailto:aadusumi@uncc.edu) | 
| 1.6 | 03/30/23 | Added REQ-ACC    | [Matthew Young](mailto:myoun101@uncc.edu) | [Matthew Young](mailto:myoun101@uncc.edu) | 
| 1.7 | 03/29/23 | Added Requirements    | [Rahul-Das](mailto:rdas6@uncc.edu)        |    [Rahul-Das](mailto:rdas6@uncc.edu)     |
| 1.8 | 04/01/23 | Added Requirements   | [Akhil Adusumilli](mailto:aadusumi@uncc.edu) | [Akhil Adusumilli](mailto:aadusumi@uncc.edu) | 
| 1.9 | 04/4/23 | Added Name    | [Artem Dyadchenko](adyadche@uncc.edu)        |    [Artem Dyadchenko](adyadche@uncc.edu)     | 
| 1.10 | 04/4/23 | Added Requirements  | [Artem Dyadchenko](adyadche@uncc.edu)  |    [Artem Dyadchenko](adyadche@uncc.edu)     |

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Constraints](#constraints)
4. [Use Cases](#use-cases)
5. [User Stories](#user-stories)
6. [Glossary](#glossary)

## Introduction

In this section, you should give a brief overview of what your project will be. Describe the software system you are building and what problems it solves. You should also give a short description of the stakeholders (users of the system) and what their needs are. There is no set formatting requirement, but you should maintain a consistent structure across future sections. Not all members must contribute to this section. **<-REPLACE THIS SECTION->**

## Requirements

Each group member must supply at least three functional requirements for the project. Each requirement should be written in the following format:

* **REQ-1:** A unique identifier for the requirement. This should be a number that is unique across the entire document (something like REQ-1, REQ-2, etc. but be sure to replace the word `ID` with the unique identifier).
  * **Description:** Implementing a CI/CD pipeline using Github actions to automate testing code, and prevent errors.
  * **Type:** `Functional`.
  * **Priority:** 3
  * **Rationale:** To automate testing code, and prevents errors being pushed on to main branch.
  * **Testing:** It can be tested by Github actions and unit tests.
* **REQ-2:** A unique identifier for the requirement. This should be a number that is unique across the entire document (something like REQ-1, REQ-2, etc. but be sure to replace the word `ID` with the unique identifier).
  * **Description:** Make sure users can filter movies by genre
  * **Type:** `Functional`
  * **Priority:** 4.
  * **Rationale:** Makes searching for movies more convenient.
  * **Testing:** See if the logic is working on the front end, nd unit testing on the back-end.
* **REQ-3:** A unique identifier for the requirement. This should be a number that is unique across the entire document (something like REQ-1, REQ-2, etc. but be sure to replace the word `ID` with the unique identifier).
  * **Description:** Users can see the cover of the movie
  * **Type:** `Functional`
  * **Priority:** 5.
  * **Rationale:**Makes the website more pleseant to see and use.
  * **Testing:** See if the user can see the pictures on the website.
* **REQ-DIVERS**:
	* **Description**: The website should work on several popular browsers like chrome, safari, edge, firefox, etc.
	* **Type**: `Functional`
	* **Priority**: 1
	* **Rationale**: Users often have differing preferences for what browser they use and websites should be ready for these users.
	* **Testing**: Testing can be done by simpily accessing the website on differing browsers and ensuring the site is stable.
* **REQ-EFF**: 
	* **Description**: The website should minimize the amount of information sent over the internet 
	* **Type**: `Functional`
	* **Priority**: 3
	* **Rationale**: Even more so than browsers, users can have a wide varity of internet speeds which can drastically effect the performance of websites, if a site is too bloated users may avoid it.
  * **Testing**: Testing can be done using chrome s throttling feature located within the network tab of the developer panel.
* **REQ-ACC**
  * **Description**: The website should have a login system for users to use.
  * **Type**: `Functional`
  * **Rationale**: In order for users to utilize a cross-device shopping cart they will have to have an account.
  * **Testing**: Testing will be done by creating accounts and utilizing several devices and/or private browsing to ensure the data is properly accessed and utilized.
* **REQ-7**
  * **Description**: Users will have basic information about movie, including name and release date.
  * **Type**: `Functional`
  * **Rationale**: Allows users to know what movie is being shown
  * **Testing**: Can be tested by creating a movie and seeing is the name and date show up underneath the movie.
* **REQ-8**
  * **Description**: Users are able to search for movies by name.
  * **Type**: `Functional`
  * **Rationale**: Allows users to find what specific movies they are looking for.
  * **Testing**: Testing can be done by creating a test list of movies and searching for keywords. That should 
  return a certain movie from the test list.
* **REQ-9**
  * **Description**: Users can see a shopping cart with all current purchases showing.
  * **Type**: `Functional`
  * **Rationale**: Allows users to see their selections and make changes easily
  * **Testing**: Can be tested by selecting some movies to add to cart and seeing if they appear in the cart.
* **REQ-AAA**
  * **Description**: The website should look good on both the phone and computer.
  * **Type**: `Functional`
  * **Priority**: 4
  * **Rationale**: Users may want to use the websire both on their computer and on their phone.
  * **Testing**: The testing can be done using the website on phone and computer.
* **REQ-BBB**
  * **Description**: Under each image of the movie sould be the title of the movie and the year of release.
  * **Type**: `Functional`
  * **Priority**: 3
  * **Rationale**: Add the title and the year of release so users know what kind of movie it is.
  * **Testing**: The esting can be done after viewing if the site has the title and year of release written under each image of the movie.
* **REQ-CCC**
  * **Description**: The website should have a navigation menu.
  * **Type**: `Functional`
  * **Priority**: 3
  * **Rationale**: The website should have a navigation menu to allow the user to navigate the site.
  * **Testing**: The testing can be done by seeng if there is a navigation menu on the site, and whether it works.
## Constraints
In this section, you should list any constraints that you have for the project. Each group member must supply at least two constraints. These can be constraints on the project itself, the software system, or the stakeholders. Constraints can be anything that limits the scope of the project. For example, that this project's template code is written using Flask and Python constitutes a constraint on the backend of the project. Constraints can also be things like the required timeline of the project. Be creative.
* Project is to have comments describing the functionality of any custom methods, classes, and algorithms.
* Code obtained from external sources must be both cited and rewritten if possible.


## Use Cases

In this section, you should list use cases for the project. Use cases are a thorough description of how the system will be used. Each group member must supply at least two use cases. Each use case should be written in the following format:

* **ID:** A unique identifier for the use case. This should be a number that is unique across the entire document (something like UC-1, UC-2, etc. but be sure to replace the word `ID` with the unique identifier).
  * **Description:** A description of the use case that gives the user a high-level overview of how the system is interacted with.
  * **Actors:** A list of the actors that are involved in the use case. Only include the actors that are directly involved. Actors are the people or things that interact with the system. For example, when ordering at a fast food restaurant, one might have the following actors: the customer, the cashier, and the cook. But only the customer and the cashier are directly involved in the use case of ordering food. The cook is not directly involved in the use case of ordering food.
  * **Preconditions:** A list of the preconditions for the use case. This should be a list of the preconditions for the use case, which are the conditions that must be met before the use case can be executed. Continuing with the restaurant example, the customer must have money in their wallet and the cashier must be logged in to the system before the use case of ordering food can be executed.
  * **Postconditions:** A list of the postconditions for the use case. This should be a list of the postconditions for the use case, which are the conditions that must be met after the use case has been executed. Continuing with the restaurant example, the customer must have their food and the cashier must have the customer's money after the use case of ordering food has been executed.

* **UC-LOGIN**
  * **Description**: Users wishes to login to the system in order to load their stored shopping cart, or information on their order(s).
  * **Actors**: User, User Management System.
  * **Preconditions**:
    * User must have an account
    * Users account must have a shopping cart or previous/pending orders.
    * User Management System must have a secure connection to the user.
    * User should have zero access to the User Management System.
  * **Postconditions**:
    * User Management System should prevent user from seeing the information of other user(s).
    * User should be able to access their information.
    * Login System should prevent non-existant users from logging in.
* **UC-CREATEACC**
  * **Description**: Users wishes to create a new account.
  * **Actors**: User, User Management System.
  * **Preconditions**:
    * Account name must not exist.
    * Password must not be blank. 
  * **Postconditions**:
    * Account should be added to the User Management System's database if creation is successful
    * Account should be automatically logged in.
* **UC-PURCHASE**
  * **Description**: User wants to buy a movie.
  * **Actors**: User, User Management System.
  * **Preconditions**:
    * Must have a account.
    * Valid credit card. 
  * **Postconditions**:
    * Purchase should be completed after given info
    * If no info is given, purchase will noot go through. 
* **UC-REFUND**
  * **Description**: User wants to return a movie.
  * **Actors**: User, User Management System.
  * **Preconditions**:
    * Must have a account.
    * Valid credit card. 
  * **Postconditions**:
    * Refund should be completed after given info
    * Money will be added back.         

## User Stories

In this section, you should list user stories for the project. User stories are a short description of how a user will be interacting with the system. Each group member must supply at least two user stories. Each user story should be written in the following format:

* **ID:** A unique identifier for the user story. This should be a number that is unique across the entire document (something like US-1, US-2, etc. but be sure to replace the word `ID` with the unique identifier).
  * **Type of User:** The type of user that the user story is for. This should be a single word that describes the type of user. For example, a user story for a customer might be `Customer` and a user story for an administrator might be `Admin`.
  * **Description:** A description of the user story that gives a narrative from that user's perspective. This can be any length, but it must paint the picture of what the user wants to do, how they intend to do it, why they want to, and what they expect to happen.
* **US-LOGIN-CUST**
  * **Type of User:** `Customer`
  * **Description:** User already has an account with a cart that they filled on their phone. The user did this because they left their credit card at home. User loads the site and accesses the login screen, They are prompted to enter their username and their password. User obliges. User logs into the site successfully and accesses their cart.
* **US-ACC-CREATE**
  * **Type of User:** `Customer`
  * **Description:** User does not have an account and wishes to save their cart so that they can purchase items when they have money available. User accesses the login page and clicks the `Create Account` link. User is prompted for a username, password and to reenter said password. User obliges. User is told that they have a typo in their password reentry and they fix it. User creates the account and their cart is automatically saved.
* **USER-GENRE**
  * **Type of User:** `Customer`
  * **Description:** The user is scrolling through a big list of movie but wants to find a specific genre to optimize his time. He clicks on the `Select Genre` button and select the genre of movie he wants to watch.
* **USER-RATING**
  * **Type of User:** `Customer`
  * **Description:** The user in the mood to watch some horrible movies to laugh at. He clicks on the `Filter by Rating` button and clicks on his preffered star rating.    

## Glossary

In this section, you should list any terms that are used in the document that may not be immediately obvious to a naive reader. Each group member must supply at least one term. Each term should be written in the following format:

* **Term:** The term that is being defined. This should be a single word or phrase that is being defined.
  * **Definition:** A definition of the term. This should be a short description of the term that is being defined. This should be a single sentence that describes the term.
* **Throttling**:
	* Definition: An intentional limitation of information flow whether it be the clock speed of a cpu or network bandwidth, can be used to simulate poor hardware/network connections, conserve power, and reduce heat generation. 
* **Bandwidth**:
	* Definition: The capacity or max speed of a network. 
* **Rest API**:
	* Definition: API stands for Application Programming Inerface and uses HTTP methods like get, post,update and read to allocate data.  


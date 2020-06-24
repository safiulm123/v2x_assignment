# V2X Network Assingment

As a Web or App developer I want to request a (filtered) list of offers and for each offer some more detailed information so that I can process/display this information in the Web or App.


# API

Different kind of filtered APIs are developed so that it is easier to get the required data.

## Requirement 1

The first requirement is to display list of orders with **visible** set to **true**. The URL to get the information is 

    http://localhost:5000/filtered_visible

### Request
There are no inputs that are required by the user.

### Response
 The response will be an array of those items that has visible set to true
 
## Requirement 2

The requirements are

 1. Total number of returned Offers
 2. The list of Offer should only contain the following information
	 
	 1. id
	 2. Complete teaser Information
	 3. detailUrl
	 4. Labels 
	 5. Price
	
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

## Requirement 3
The requirements is to show list of offers limited to the user input as a number. (e.g. return only 10 offers)

     http://localhost:5000/limit_filter

### Request
There are some JSON keys that are required by the user

    {limit: <UserInput>}

### Response
 The response will be a 200-OK with the following JSON keys
 1.  **Items** which will be a JSON Array and the length of the array will be the limit provided by the user

## Requirement 4

The requirements are

 1. Total number of returned Offers
 2. The list of Offer should only contain the following information
	 
	 1. id
	 2. Complete teaser Information
	 3. detailUrl
	 4. Labels 
	 5. Price
	
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

## Requirement 5

The requirement for this API is to display the list of offers in ascending order by price
	
     http://localhost:5000/sorted_by_price

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with a **JSON Array** and all the prices will be in **ascending order**.

## Requirement 6

The requirement is to show a detailed offer for which visible is set to true 
	
     http://localhost:5000/detailedInfo_visible_ByID

### Request
There is one input that is required by the user and that is required to check if the id has visible to true or not.

    { "id":"114"}

### Response
 The response will be a 200OK with the following JSON keys
 - **200-OK** - Items with the detailed offer will be shared 
 -  **400- Bad Request** -  If the visible is set to false then it will notify that visible is set to false

## Requirement 7

The requirements is to provide detailed info but it should be without teaser information and the detailUrl.
	
     /detailedInfo_without_teaser_ByID

### Request
There is one input that is required by the user and that is required to check if the id has visible to true or not.

    { "id":"114"}

### Response
 The response will be a 200OK with the following JSON keys
 - **200-OK** -  the detailed offer will be shared without detailUrl and teaser
 -  **400- Bad Request** -  If id is not given that it will send the error

## Requirement 8
The requirements is to provide fo
     http://localhost:5000/filtered_specific_data

### Request
There are no inputs that are required by the user.

### Response
 The response will be a 200OK with the following JSON keys 
 1. **TotalUsers** 
 2.  **Items** which will be a JSON Array with id, teaser, detailUrl, labels and price information 

## Switch to another file

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

## Rename a file

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Delete a file

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.


# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.


# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.


# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
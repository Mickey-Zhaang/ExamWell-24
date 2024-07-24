# ExamWell-24

<b><u>Authors:</u></b> Katie Bernard, Kingsford Sarpong, Mickey Zhang

<h1> Overview of Exam Well </h1>

<h2>Handling NPM Dependencies</h2>

* Download nodejs from here https://nodejs.org/en, and into your program files
* ensure that you add the nodejs file into your environmental PATH variables (Ask GPT it can help)
* run `npm install` in the terminal of /ExamWell-24 to install all dependencies for NPM,

<h2>Backend python dependencies</h2>

* run `python3 -m venv .venv` in the terminal of /ExamWell-24
* run `pip install -r requirements.txt` in the same terminal to install all backend dependencies.


<h2>How to Run</h2>

* Once all dependencies have been installed, start a virtual environment (venv) by typing `source .venv/Scripts/activate` in the terminal
* In /ExamWell-24 directory open terminal and type `cd backend` to move into /backend
* run app.py through `python app.py` and split the terminal into 2 becuase we need this server running
* use the second terminal to change directories back to /ExamWell-24 with `cd ..` and move into /frontend through `cd frontend`
* there start the server with `npm run dev` and it should take you to the home page in your browser


<h2> How to keep up to date with the main branch </h2> 

* First run `git stash` to stash any uncommitted changes you have worked on

* Check all your stashed changes with `git stash list`

* Keep up to date with the main branch with `git pull origin main`

* Apply any of ur changes with `git stash apply` if nothing major has been altered

* Finally resolve any conflicts that may have arose from pulling
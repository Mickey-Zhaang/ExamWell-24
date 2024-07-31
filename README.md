# ExamWell-24

<b><u>Authors:</u></b> Katie Bernard and Mickey Zhang

ExamWell is an AI-driven problem bank designed to help high school STEM teachers generate high-quality, diverse exam problems efficiently. By leveraging advanced language models and a robust multi-pass generation process, ExamWell provides teachers with customizable, accurate, and relevant exam questions, allowing them to focus more on teaching and less on exam preparation.

The development of ExamWell was driven by extensive customer interviews with high school STEM teachers. We identified key pain points such as time constraints, the need for quality control, and customization requirements. Our solution directly addresses these issues, ensuring that ExamWell meets the real needs of teachers.

<h2>Features</h2>
- Customizable Problem Generation: Teachers can search for specific subjects, specify problem types (e.g., open response, multiple choice), and choose difficulty levels (easy, medium, hard).
- Multi-Pass Quality Assurance: ExamWell employs a multi-pass generation and evaluation process to guarantee top-quality problems.
    - Initial Generation: Problems are generated using tested prompt engineering methods.
    - Evaluation Pass: A larger model evaluates the generated problems for solvability, factfulness, fit to the teacher's requested parameters, and overall quality.
    - Feedback Loop: Problems that do not meet the required standards are sent back to the generator for adjustments based on feedback. This cycle continues until the problem achieves optimal quality.
- User-Friendly Interface: Easy-to-use interface for seamless problem generation and selection. (Still in MVP version)

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
Python 3.8 or later
Pip

<h3>Installation</h3>
- Clone the repository
- Create a virtual environment
- Install NPM dependencies with 'npm install'
- Install the required packages with 'pip install -r requirements.txt'

<h3>Usage</h3>
- In the backend directory, run app.py with `python app.py`
- In a second terminal, move into the frontend directory and start the server with `npm run dev`

<h3>Contributing</h3>
We welcome contributions from the community! Here's how you can get involved.
- Fork the repository
- Create a new branch for your feature or bug fix
- Commit your changes and push to your branch
- Open a pull request and provide a detailed description of your changes

<h3>What's Next</h3>
- Finetuning different models on curriculums and problem sets for different subjects, such as AP Calculus, AP Physics, Geometry, etc.
- Enhanced User Interface
- Creating a database for teacher-verified questions
- Building user log-ins

from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI, OpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain.prompts import PromptTemplate
import configparser

load_dotenv()


# SETTING UP THE LLMS
# Generator creates the problem
# Fact checker assesses the problem and provides feedback
openai_api_key=os.getenv('OPENAI_API_KEY', '') 
generator_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
fact_checker_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
fixer_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
summarizer_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)

# PROMPT ENGINEERING

# Prompt template for generator
generator_template = """
Give me an exam problem based on the curriculum of {subject} about {topic}.
It should be a {type_of} questions and of level {difficulty}. Additional parameters that should be used include: {additionals} (ignore if blank)

Respond with just the exam problem. Do not provide an answer.
"""

generator_prompt = PromptTemplate(
    input_variables=["subject", "topic", "type_of", "difficulty", "additionals"],
    template=generator_template,
)

# final_prompt = prompt.format(subject='AP Calculus BC', topic="optimization", type="word problem", difficulty="hard")

# Prompt template for 
fact_check_template = """
You are a fact-checker for exam problems. Assess the following problem:
"{problem}"

1. Check if the problem is solvable. Provide the answer if it is solvable. If it is not solvable, provide comments about why it is not. 
2. Verify the factual correctness of the problem. If it is incorrect, provide comments about why it is not factually correct.
3. Assess if the problem fits the given difficulty level and topic. If it does not, provide comments as to why it does not fit.
4. Comment on the overall quality of the problem.

Provide your feedback in the following JSON format:
{{
    "solvability": {{
        "isSolvable": boolean,
        "answer": "string",
        "comments": "string"
    }},
    "correctness": {{
        "isCorrect": boolean,
        "comments": "string"
    }},
    "parameters": {{
        "fitsDifficulty": boolean,
        "fitsTopic": boolean,
        "comments": "string"
    }},
    "quality": {{
        "isHighQuality": boolean,
        "comments": "string"
        "utilizes all additional parameters": boolean
    }}
}}
"""

fact_check_prompt = PromptTemplate(
    input_variables=["problem", "topic", "difficulty"],
    template=fact_check_template,
)

# Prompt template for fixer
fixer_template = """
The following exam problem is based on the curriculum of {subject} about {topic}. It should be a {type_of} and of level {difficulty}. Additional parameters that should be used include: {additionals} (ignore if blank) 
Problem: "{problem}" . 
The following json file contains feedback for this problem. For each category that has the boolean 'False', read the comment describing what is wrong.
Rewrite the problem according to those comments.
JSON feedback file: "{json}".

Respond with just the exam problem. Do not provide an answer.
"""

fixer_prompt = PromptTemplate(
    input_variables=["subject", "topic", "type_of", "difficulty", "additionals", "problem"],
    template=fixer_template,
)

summarizer_template = """
Take the following problem, "{problem}" and write me a brief summary-title about it.
Respond with just the brief summary-title.
"""

summarizer_prompt = PromptTemplate(
    input_variables=["problem"],
    template=summarizer_template,
)
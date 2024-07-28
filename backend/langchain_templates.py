from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI, OpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain.prompts import PromptTemplate

load_dotenv()

# SETTING UP THE LLMS
# Generator creates the problem
# Fact checker assesses the problem and provides feedback
openai_api_key=os.getenv('OPENAI_API_KEY', '') #insert key
generator_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
fact_checker_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
fixer_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)

# PROMPT ENGINEERING

# Prompt template for generator
generator_template = """
Give me an exam problem based on the curriculum of {subject} about {topic}.
It should be a {type} and of level {difficulty}.

Respond with just the exam problem
"""

generator_prompt = PromptTemplate(
    input_variables=["subject", "topic", "type", "difficulty"],
    template=generator_template,
)

# final_prompt = prompt.format(subject='AP Calculus BC', topic="optimization", type="word problem", difficulty="hard")

# Prompt template for 
fact_check_template = """
You are a fact-checker for exam problems. Assess the following problem:
"{problem}"

1. Check if the problem is solvable. Provide the answer if it is solveable. If it is not solveable, provide comments about why it is not. 
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
    }}
}}
"""


fact_check_prompt = PromptTemplate(
    input_variables=["problem", "topic", "difficulty"],
    template=fact_check_template,
)

# Prompt template for fixer
fixer_template = """
The following exam problem is based on the curriculum of {subject} about {topic}. It should be a {type} and of level {difficulty}. 
Problem: "{problem}" . 
The following json file contains feedback for this problem. For each category that has the boolean 'False', read the comment describing what is wrong.
Rewrite the problem according to those comments.
JSON feedback file: "{json}".
"""

fixer_prompt = PromptTemplate(
    input_variables=["subject", "topic", "type", "difficulty", "problem", "json"],
    template=fixer_template,
)
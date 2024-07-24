from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI, OpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain.prompts import PromptTemplate

load_dotenv()

# SETTING UP THE LLMS
# Generator creates the problem
# Fact checker assesses the problem and provides feedback
openai_api_key=os.getenv('OPENAI_API_KEY', 'x') #insert key
generator_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)
fact_checker_llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=openai_api_key)

# PROMPT ENGINEERING
# Prompt template for generator
generator_template = """
Give me an exam problem based on the curriculum of {subject} about {topic}.
It should be a {type} and of level {difficulty}.

Respond with just the exam problem
"""

prompt = PromptTemplate(
    input_variables=["subject", "topic", "type", "difficulty"],
    template=generator_template,
)

# final_prompt = prompt.format(subject='AP Calculus BC', topic="optimization", type="word problem", difficulty="hard")

# Prompt template for 
fact_check_template = """
You are a fact-checker for exam problems. Assess the following problem:
"{problem}"
Make sure it is addressing an important component of the topic {topic}, is of high quality, and fitting to the difficulty level {difficulty}.
Verify the facts stated within the problem are true and ensure it is solvable with a tidy solution.
Provide feedback on any issues and solve the problem if it is correct. If it has issues, explain them clearly.

Feedback and solution:
"""

fact_check_prompt = PromptTemplate(
    input_variables=["problem", "topic", "difficulty"],
    template=fact_check_template,
)

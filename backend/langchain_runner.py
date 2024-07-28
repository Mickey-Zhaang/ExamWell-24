from langchain_templates import generator_prompt
from langchain_templates import generator_llm
from langchain_templates import fact_check_prompt
from langchain_templates import fact_checker_llm
from langchain_templates import fixer_llm
from langchain_templates import fixer_prompt
import json

# Function to check if all booleans are True in the JSON feedback
def is_feedback_positive(feedback):
    return all(
        feedback['solvability']['isSolvable'] and
        feedback['correctness']['isCorrect'] and
        feedback['parameters']['fitsDifficulty'] and
        feedback['parameters']['fitsTopic'] and
        feedback['quality']['isHighQuality']
    )

# Chain logic to generate, fact-check, and fix problems
def generate_fact_check_and_fix(subject, topic, type, difficulty, max_iterations=3):
    for iteration in range(max_iterations):
        # Generate the problem
        generated_problem_prompt = generator_prompt.format(subject=subject, topic=topic, type=type, difficulty=difficulty)
        generated_problem = generator_llm(generated_problem_prompt)

        # Fact-check the problem
        fact_check_prompt_str = fact_check_prompt.format(problem=generated_problem, topic=topic, difficulty=difficulty)
        fact_check_result = fact_checker_llm(fact_check_prompt_str)
        feedback = json.loads(fact_check_result)

        # Check if feedback is positive
        if is_feedback_positive(feedback):
            print(f"Generated Problem: {generated_problem}")
            print(f"Fact-check Feedback: {json.dumps(feedback, indent=4)}")
            return

        # If feedback is not positive, fix the problem
        fixer_prompt_str = fixer_prompt.format(
            subject=subject, topic=topic, type=type, difficulty=difficulty,
            problem=generated_problem, json=json.dumps(feedback)
        )
        fixed_problem = fixer_llm(fixer_prompt_str)
        print(f"Iteration {iteration+1} Feedback: {json.dumps(feedback, indent=4)}")

    print("Failed to generate a valid problem after 3 iterations.")

# Example usage
subject = "AP Calculus BC"
topic = "optimization"
type = "word problem"
difficulty = "hard"

generate_fact_check_and_fix(subject, topic, type, difficulty)
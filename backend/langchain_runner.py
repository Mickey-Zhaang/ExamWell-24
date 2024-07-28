from langchain_templates import generator_prompt
from langchain_templates import generator_llm
from langchain_templates import fact_check_prompt
from langchain_templates import fact_checker_llm
from langchain_templates import fixer_llm
from langchain_templates import fixer_prompt
import json

# Function to check if all booleans are True in the JSON feedback
def is_feedback_positive(feedback):
    return (
        feedback['solvability']['isSolvable'] and
        feedback['correctness']['isCorrect'] and
        feedback['parameters']['fitsDifficulty'] and
        feedback['parameters']['fitsTopic'] and
        feedback['quality']['isHighQuality']
    )

# Chain logic to generate, fact-check, and fix problems
def generate_fact_check_and_fix(subject, topic, difficulty, type_of, additionals, max_iterations=3, verbose = False):
    for iteration in range(max_iterations):
        # Generate the problem
        generated_problem_prompt = generator_prompt.format(subject=subject, topic=topic, type_of=type_of, difficulty=difficulty, additionals=additionals)
        generated_problem = generator_llm.invoke(generated_problem_prompt)

        # Fact-check the problem
        fact_check_prompt_str = fact_check_prompt.format(problem=generated_problem, topic=topic, difficulty=difficulty, additionals=additionals)
        fact_check_result = fact_checker_llm.invoke(fact_check_prompt_str)
        feedback = json.loads(fact_check_result)

        # Check if feedback is positive
        if is_feedback_positive(feedback):
            if verbose:
                print(f"Generated Problem: {generated_problem}")
                print(f"Fact-check Feedback: {json.dumps(feedback, indent=4)}")
            return generated_problem
        
        # If feedback is not positive, fix the problem
        fixer_prompt_str = fixer_prompt.format(
            subject=subject, topic=topic, type_of=type_of, difficulty=difficulty,
            problem=generated_problem, additionals=additionals, json=json.dumps(feedback)
        )
        fixed_problem = fixer_llm(fixer_prompt_str)

        # Fact-check the problem
        fact_check_prompt_str = fact_check_prompt.format(problem=fixed_problem, topic=topic, difficulty=difficulty)
        fact_check_result = fact_checker_llm.invoke(fact_check_prompt_str)
        feedback = json.loads(fact_check_result)

        # Check if feedback is positive
        if is_feedback_positive(feedback):
            if verbose:
                print(f"Generated Problem: {fixed_problem}")
                print(f"Fact-check Feedback: {json.dumps(feedback, indent=4)}")
            return fixed_problem
        
        if verbose:
            print(f"Iteration {iteration+1} Feedback: {json.dumps(feedback, indent=4)}")
        return 
        
    if verbose:
        print(f"Failed to generate a valid problem after {max_iterations} iterations.")
    return None

def create_list(subject, topic, difficulty, type_of, additionals, num_in_list = 5, max_iterations=3, verbose = False):
    i = 0
    problem_list = []
    while i <= num_in_list:
        generated_problem = generate_fact_check_and_fix(subject, topic, difficulty, type_of, additionals, max_iterations, verbose)
        if generated_problem != None:
            i += 1
            problem_list.append(generated_problem)
    return problem_list

# # Example usage
# subject = "AP Calculus BC"
# topic = "optimization"
# type = "word problem"
# difficulty = "hard"
# additionals = "pythagorean theorem"

# generate_fact_check_and_fix(subject, topic, type, difficulty, additionals)
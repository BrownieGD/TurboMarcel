import re
import os

curr_line = 0


def main() -> None:
    global curr_line
    with open("name.tuma") as file:
        content = file.readlines()
        while curr_line < len(content):
            instruction = content[curr_line]
            if instruction:
                execute_instruction(instruction)
            curr_line += 1


def convert_to_type(s):
    if s.lower() == "true":
        return True
    elif s.lower() == "false":
        return False
    try:
        return int(s)
    except ValueError:
        pass
    try:
        return float(s)
    except ValueError:
        pass
    return s


def replace_with_globals(s):
    pattern = r"\{([A-Za-z_][A-Za-z0-9_]*)\}"

    def replacer(match):
        var_name = match.group(1)
        if var_name in globals():
            return str(globals()[var_name])
        else:
            return match.group(0)

    result = re.sub(pattern, replacer, s)
    return result


def execute_instruction(instruction: str) -> None:
    global curr_line
    try:
        # Regex Expressions
        RE_JMP = r"^JMP \d+$"
        RE_CONSOLE_OUTPUT = r"^OUT .*"
        RE_CONSOLE_INPUT = r"^IN .*"
        RE_VARIABLE = r"^VAL .* .*"
        RE_COND = r"^COND .* .*"
        RE_END = r"^END"
        # Check which Regex and execute instruction
        # Jump
        if re.findall(RE_JMP, instruction) != []:
            split_up = instruction.split(" ")
            line = int(split_up[1])
            curr_line = line - 1
        # Console output
        elif re.findall(RE_CONSOLE_OUTPUT, instruction):
            out = " ".join(instruction.split()[1:])
            print(replace_with_globals(out))
        # Console Input
        elif re.findall(RE_CONSOLE_INPUT, instruction):
            split_up = []
            for i in instruction.split(" "):
                split_up.append(i.strip())
            globals()[split_up[1]] = convert_to_type(input(""))
        # Variables
        elif re.findall(RE_VARIABLE, instruction):
            split_up = instruction.split(" ")
            arr = split_up[2:]
            merged_string = (''.join(arr)).strip().replace('\n', '').replace('\r', '')
            globals()[split_up[1]] = eval(merged_string)
        # Cond Jump
        elif re.findall(RE_COND, instruction):
            pattern = r"(\w+)\s*(\(.*?\))\s*(\d+)"
            match = re.match(pattern, instruction)
            if match:
                part1 = match.group(1)
                part2 = match.group(2)
                part3 = match.group(3)
            if eval(part2):
                curr_line = int(part3)
        # End Programm
        elif re.findall(RE_END, instruction):
            os._exit(0)
        # If not exist
        else:
            print("Instruction " + instruction + ": does not exist")
    except Exception as e:
        print(f"Error at: {instruction}")
        print(f"Exception: {e}")

if __name__ == "__main__":
    main()

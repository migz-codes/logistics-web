---
name: create-skill
description: Guides you through creating a new Windsurf skill with proper structure and best practices
---

# Create a New Windsurf Skill

This skill helps you create new Windsurf skills with the correct structure and documentation.

## Prerequisites
- Basic understanding of Markdown
- Knowledge of what the skill should do

## Skill Creation Steps

### 1. Define Skill Purpose
// turbo
Let's start by defining what your skill will do. Please provide a brief description of the skill's purpose.

### 2. Create Skill Directory
// turbo
Create a new directory for your skill in the appropriate location:

```bash
# For workspace-specific skill
mkdir -p .windsurf/skills/your-skill-name

# For global skill (available in all projects)
# mkdir -p ~/.codeium/windsurf/skills/your-skill-name
```

### 3. Create SKILL.md
// turbo
Create a `SKILL.md` file with the following structure:

```markdown
---
name: your-skill-name
description: Brief description of what your skill does
---

# Skill Name

Detailed description of the skill, its purpose, and when to use it.

## Prerequisites
- Any requirements or dependencies

## How to Use
Step-by-step instructions on how to use the skill

## Examples
```typescript
// Example code or usage
```

## Best Practices
- Tips for getting the most out of this skill

## Troubleshooting
Common issues and how to resolve them
```

### 4. Add Supporting Files (Optional)
// turbo
If your skill needs additional files (templates, scripts, etc.), add them to the skill directory.

### 5. Test Your Skill
// turbo
Test your skill to ensure it works as expected.

## Skill Template

Here's a complete template you can use:

```markdown
---
name: skill-name
description: Brief description of what your skill does
---

# Skill Name

## Purpose
[What problem does this skill solve?]

## Prerequisites
- [List any prerequisites]

## Usage
[How to use this skill]

### Example
```typescript
// Example usage
```

## Best Practices
- [Best practice 1]
- [Best practice 2]

## Common Issues
- [Issue 1]: [Solution]
- [Issue 2]: [Solution]
```

## Best Practices for Skill Creation

1. **Naming Conventions**
   - Use kebab-case for skill names
   - Be descriptive but concise
   - Avoid special characters

2. **Documentation**
   - Always include examples
   - Document prerequisites
   - Include troubleshooting section

3. **Structure**
   - Keep related files together
   - Use clear section headers
   - Include both basic and advanced usage

4. **Testing**
   - Test in different scenarios
   - Document edge cases
   - Include error handling examples

## Example: Creating a New Skill

Let's say you want to create a skill called `deploy-staging`. Here's how you would use this skill:

1. Run `@create-skill`
2. Follow the prompts to define your skill
3. The skill will create the proper directory structure
4. Edit the generated files as needed
5. Test your new skill

## Next Steps

After creating your skill, consider:
1. Adding it to version control
2. Documenting it for your team
3. Creating tests if applicable
4. Adding examples of common use cases

## Need Help?

If you need assistance creating your skill, you can:
1. Check existing skills for reference
2. Review Windsurf's documentation
3. Ask your team for feedback
4. Test with simple examples first

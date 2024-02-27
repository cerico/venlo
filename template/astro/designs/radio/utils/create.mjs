import fs from 'fs';
import escodegen from 'escodegen';
import * as acorn from 'acorn';
import { generateFullSlug } from './index.mjs';
const now = new Date().toDateString();
const displayDate = (new Date()).toLocaleDateString("en-GB",{day: 'numeric', month:'short', year: 'numeric'});
const iso = new Date().toISOString().replaceAll(':','-')

const filePath = 'src/text/index.mjs';

// New entry to be added
export const createEntry = (category, story) => {
  const newEntry = {
    title: category,
    stories: [
      {
        title: story,
        published_at: now
      }
    ]
  };

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the code using acorn with sourceType: 'module'
    let ast;
    try {
      ast = acorn.parse(data, { ecmaVersion: 2020, sourceType: 'module' });
    } catch (parseError) {
      console.error('Error parsing the code:', parseError);
      return;
    }

    // Find the variable declaration for 'series'
    const seriesDeclaration = ast.body.find(node => {
      return node.type === 'VariableDeclaration' &&
             node.declarations.length === 1 &&
             node.declarations[0].id.name === 'series';
    });

    if (!seriesDeclaration) {
      console.error('Could not find the series variable declaration.');
      return;
    }

    // Check if an object with the given category already exists
    const existingEntry = seriesDeclaration.declarations[0].init.elements.find(entry => {
      return entry.type === 'ObjectExpression' &&
             entry.properties.some(prop => prop.key.name === 'title' && prop.value.value === category);
    });

    if (existingEntry) {
      // If category exists, push the new story into its 'stories' array
      existingEntry.properties.find(prop => prop.key.name === 'stories').value.elements.push({
        type: 'ObjectExpression',
        properties: [
          {
            type: 'Property',
            key: { type: 'Identifier', name: 'title' },
            value: { type: 'Literal', value: story }
          },
          {
            type: 'Property',
            key: { type: 'Identifier', name: 'published_at' },
            value: { type: 'Literal', value: now }
          }
        ]
      });
    } else {
      // If category doesn't exist, add a new entry to the series array
      seriesDeclaration.declarations[0].init.elements.push({
        type: 'ObjectExpression',
        properties: [
          {
            type: 'Property',
            key: { type: 'Identifier', name: 'title' },
            value: { type: 'Literal', value: newEntry.title }
          },
          {
            type: 'Property',
            key: { type: 'Identifier', name: 'stories' },
            value: {
              type: 'ArrayExpression',
              elements: newEntry.stories.map(story => ({
                type: 'ObjectExpression',
                properties: Object.entries(story).map(([key, value]) => ({
                  type: 'Property',
                  key: { type: 'Identifier', name: key },
                  value: { type: 'Literal', value }
                }))
              }))
            }
          }
        ]
      });
    }

    // Convert the modified AST back to JavaScript code using escodegen
    const modifiedCode = escodegen.generate(ast, { format: { indent: { style: '  ' } } });

    // Write the modified code back to the file
    fs.writeFile(filePath, modifiedCode, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
      } else {
        console.log('Entry added successfully!');
      }
    });
  });
};

export const createArticle = (category, story) => {
  const md = `
## ${story}

${displayDate}
`

  const output = md
  const slug = generateFullSlug(category, story)
  fs.writeFileSync(`./src/content/${slug}.md`, output)
}

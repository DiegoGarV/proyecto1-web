/**
 * @fileoverview ESLint rule to forbid the use of semicolons.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
      docs: {
        description: "Forbid the use of semicolons",
        category: "Stylistic Issues",
        recommended: false,
      },
      fixable: "code",
      schema: [], // no options
    },
  
    create(context) {
      //----------------------------------------------------------------------
      // Public
      //----------------------------------------------------------------------
  
      return {
        Program(node) {
          const sourceCode = context.getSourceCode()
          const tokens = sourceCode.tokensAndComments
  
          tokens.forEach((token) => {
            if (token.type === "Punctuator" && token.value === ";") {
              context.report({
                node,
                loc: token.loc,
                message: "Unexpected semicolon.",
                fix(fixer) {
                  return fixer.remove(token)
                },
              })
            }
          })
        },
      }
    },
  }
  
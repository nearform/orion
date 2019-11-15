export default {
  site: { siteMetadata: { title: 'EFQM Assess Base' } },
  assessmentTypes: {
    nodes: [
      {
        orderIndex: 0,
        name:
          "Copy and edit this example assessment definition file. This is the assessment's full title",
        key: '_example',
        logoAsset: 'image-file-name-without-extension',
        shortDescription:
          'This describes the assessment on the the homepage. This dummy assessment is a sample definition with an example of every field.',
      },
      {
        orderIndex: 3,
        name: 'business matrix advanced',
        key: 'efqm-2020-advanced',
        logoAsset: 'assess-3-img',
        shortDescription:
          'This tool provides a complete assessment against all criterion-part of the EFQM Model and score on the full RADAR attributes.  Through this tool, organisation can generate a detailed enabler maps and results report.',
      },
      {
        orderIndex: 2,
        name: 'business matrix',
        key: 'efqm-2020',
        logoAsset: 'assess-2-img',
        shortDescription:
          'This tool allows organisation to complete an assessment against the criteria of the EFQM Model and score based on the RADAR elements.  The information captured for each criterion generate a first Enablers Maps.',
      },
      {
        orderIndex: 1,
        name: 'questionnaire',
        key: 'questionnaire',
        logoAsset: 'assess-1-img',
        shortDescription:
          'A simple assessment tool with about 5 questions per criteria of the EFQM Model.  The best tool to conduct a first assessment, helping identify the current position and determine future directions and priorities.',
      },
    ],
  },
  heroBanner: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAABHklEQVQY022OzUsCURTF5x9zHxiSNTVlhjYQYk6NZH7kNFGSbdwFQbUZaxW0yXWrNi2CYNxI0KpFULmwKFrYm3N6b0pS6MLv3fsO9+NovaDH4QgkLyCvup9s3D5T924YsY84ZhQ5oS8zkbQ5o2c5pecY0y3OmRucX3I4a1ZoLBSpyXlAAAh+oEKWSlc89omTuz5SzQ4i1iliyRpSZhmZvAvbqaPkNlAu7aGwVkM6YUFDODcaSgmgLg1+5EefvOy8s3LcZnylxelck1nXY6G6z/VMldurLvNpO3QohkHod5AhpGEhn5Ge+4dX4Z23hb3VEvHFAxE16iKqV8X4ZF6ohf5/yKUSyBphVnwJ/Gp/fU/dN//s4trf3G36zs6h/w37n0gF7UW1bAAAAABJRU5ErkJggg==',
        aspectRatio: 3.66412213740458,
        src: '/static/64716d72e349c7bc13eb42a13ac6f892/ea5de/bannerHeroAB.png',
        srcSet:
          '/static/64716d72e349c7bc13eb42a13ac6f892/6b0e5/bannerHeroAB.png 200w,\n/static/64716d72e349c7bc13eb42a13ac6f892/a489e/bannerHeroAB.png 400w,\n/static/64716d72e349c7bc13eb42a13ac6f892/ea5de/bannerHeroAB.png 800w,\n/static/64716d72e349c7bc13eb42a13ac6f892/b36f0/bannerHeroAB.png 1200w,\n/static/64716d72e349c7bc13eb42a13ac6f892/cfd9e/bannerHeroAB.png 1600w,\n/static/64716d72e349c7bc13eb42a13ac6f892/34094/bannerHeroAB.png 2880w',
        sizes: '(max-width: 800px) 100vw, 800px',
      },
    },
  },
  modelImage: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAACXBIWXMAAC4jAAAuIwF4pT92AAAFgUlEQVQ4yz1UeVDTRxj9qdjDznTGtlqnrWOPqaU6FTutxx8eaMFiPYpOsUMVEQoWFRQGCiiIXElA5A4hkctwBRJKggWScGMIJgQMBIQQCQy5fzmAkKpFyX5NQnX/ebsz33v7dr99i2GOcblR5gRsP128Cvt/uGV17vmC3EPwKGhr/pjU0rktl9/uUdRd9kF+7zkspOxNZ40vc3iNE0ntk9gtrnyFSBepXHigcuC12JZyccqu0p6Hh/M40qC8mvEhkVBDYzYpD2UwRrzu8iXuFaJG90rJdmftOc6YS5TaN7NCBgDsO3IvJrC+dK39G0ZzCbyhQRKjZXpLChs+TGuBcDofvMk8x7wZ/MhN1pqOvoFAtkwQxBpxd3Ku3X+8+pUZ7A/WoMOywrVLIldxPq9jfNAgl2nutIph7c379vVEvv1PlgB5Urvsb6W0Lu/K5YFybBj44lFxIneSuaSYcoml8xWYXr+IYSVCk0uY/Wh2HeuRrkmhnHmsUatgQi5/mc4dgt0V/Si8dQQdrR1Ap6uEwJeM2WeUSlDNTM+3japFjCH9KSe/cVi34lKq0ro5UWl+sU+JW4VG3DCv0mjBatQjjlyHNtVOIKxEBhhtBPx5U8hiMoJKrbbjBgPojJYxOf40x8nvlqjcXh+7b2Lwndk5E2PBau01GAzLBoMecLMFRQnU6GyHFgLadXCmVQ0H65TAHTcgm8VoN5ktYJmzKHGjjTsyqj/u1OnsXrk6rEEqoEyop0UWs9lqwHEwGXFkWrBBtmQGciRqSOvDIaVLD1capqF9woSe2+aRWqNFJpMZcNwobeWPC8voIlfXsfjmyp/KBFyxRq3W4Y7j6HR6+1Pbc1i0LaC6URnE8fqByBZCVJUEQktlIJsywot/n8HcnBkZdFoHGkH6SC5Jy+TRXIK+ldnFbWKhdF6rB+2sannOMg+dcg4qfpiB8oWVUN7MhiZmHTCYf0Fkbg8ExHEhOpWLNBocqtgC+85TGRBNrNbdyec+CI2q+xo7Qs/u4vV0TV9vrIAmSb9dKO9BFzmnUEpHCJC6kuFeUxW0sDnAYjVA8A0OHDnLgG0HciEoqhYdDiiE9/YmwNYfb71IJDLF4XH1v2A+Vfl9JwpTLW5J52E7ORb5MePRucZAoIlvAU1EhEJ+CZDKyoF092+IIrRBcCQbfgurgdOh5RCdXo+++jEN/K+RlwppbIn3r+QIbA+N8ODA7XjNaofgzqJYFNlMRrsq/CCaFwbEzhhI4CRDYk0VBCYxwT+iHk4E3AMPrxw4HkRFuaUtcDqswHGHgy9zKJyBb7zSA7HNOTGMbAZdFlVNgbPlWcsJzXT4ofoaOlJ9EkIa/IDITQeNSQfFtULYfbIQ3D2zwPMMGYXdqEZfeqejz7zSIDyhaP5SXGm/u8/tPdi7pMuhlxk0SW9X9z+fZ16FtwmB9kBWAfTJhejBZDfCLQb0/OkzZLMtoqGRaXQlqR4Fx9GhsKIVvb/3+vKn3qlwNJA44umfw3K0+A0MC/dZtyEj4v7FotviHZnRsJ4YBr/Xku1mtcFuNlgcicCRVqcDR4KQXDFt97pAtrsfJdmPhRQCndkGMclFT3xD8iWbDyb7vk7KxsyIHd9SUwW+ZII4ojRvTjQwAM686hzvzOh46DiOL5nNxmXF1CwcvlAIm/bfhKBY6tKMYuzx1QT64Pc/Z91w6viFlqzG3ClJrrhszI529ygl1gXUFj9kdPFG+4eH1BPKJxqVXjtpWVgQarVmqWpWq6pp7NVciC6Zyipgi8+EULt3+mSEvvoGN+yNX3G4lXJzzSu3a+9EHjtUTiLENFWQS4U8imBKdtu4aA2WjRqu1zVIyQWUHkoyoTnnSizz0rEA6idOTj61b9VH+1wmsf8A88eNbKUc5cQAAAAASUVORK5CYII=',
        aspectRatio: 1.03125,
        src: '/static/d589e59b219662ddb34f1dad403127f2/ea5de/modelImageAB.png',
        srcSet:
          '/static/d589e59b219662ddb34f1dad403127f2/6b0e5/modelImageAB.png 200w,\n/static/d589e59b219662ddb34f1dad403127f2/a489e/modelImageAB.png 400w,\n/static/d589e59b219662ddb34f1dad403127f2/ea5de/modelImageAB.png 800w,\n/static/d589e59b219662ddb34f1dad403127f2/b36f0/modelImageAB.png 1200w,\n/static/d589e59b219662ddb34f1dad403127f2/cfd9e/modelImageAB.png 1600w,\n/static/d589e59b219662ddb34f1dad403127f2/751a3/modelImageAB.png 2277w',
        sizes: '(max-width: 800px) 100vw, 800px',
      },
    },
  },
  assets: {
    nodes: [
      {
        name: 'assess-1-img',
        childImageSharp: {
          fixed: {
            base64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAA5ElEQVQY02P49+9fMDL+C8T///8PuPPhd3zDma+Lzj//nnrj5quEc9dept649zbhH0Q+CF0fDDOgC/z++y8EqMHv+Is/mTF7v9/edutb0Z79t/M27LlTuu/4o5y/f0k0EOyCf/+Dfv39GXLj2/m0S2+upZ+/+C75xIWnGZdvvk4m2YV///0Fe/nx93vxhz6tKn/78UPknqOPcncffZB3/NzTjL+kGwjW4H/7w7+E6pO/lp1//iv17t3XcZdvvUm68/B9HNlhePLFr4yE/Z+vbb/1uWjXvtt563ffKd177GEuoTAEAM0Jf7C+3vNjAAAAAElFTkSuQmCC',
            width: 304,
            height: 100,
            src:
              '/static/98378e6a5494f8ad8c7c25c10069bfeb/e67b3/assess-1-img.png',
            srcSet:
              '/static/98378e6a5494f8ad8c7c25c10069bfeb/e67b3/assess-1-img.png 1x',
          },
        },
      },
      {
        name: 'assess-2-img',
        childImageSharp: {
          fixed: {
            base64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAA4UlEQVQY02P49+9fMDr+//9/EIz98+/PUCDf+9KnSxm7X+2uBLJ9//z7E4JNHwgz4DIMSAdCse/Drw8T2u61HdxxY2/Zkf0XMpAtJGggzLB3v95Fvf75Ovr7nx+htbdqr6x/sqFl7YIDhVt2HSwCygf8/fuXOAP//vsLNvDVz1cx7Xfa95XdKH016+nMedcPP45du2V32dnz11JA8iR5+fff3yGgcDvy7kjRhPsT1uzZfip7yoxl7RMmL+7asHlfMUkuhBkKCnhQ+AGx+8UrN5MvXLqRfPHyzeRHj57H4AtDAOFXfMymSnF9AAAAAElFTkSuQmCC',
            width: 304,
            height: 100,
            src:
              '/static/75f830af7274b8365073fa2b4048ddbc/e67b3/assess-2-img.png',
            srcSet:
              '/static/75f830af7274b8365073fa2b4048ddbc/e67b3/assess-2-img.png 1x',
          },
        },
      },
      {
        name: 'assess-3-img',
        childImageSharp: {
          fixed: {
            base64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAA5ElEQVQY02P49+9fMDr+//9/EIwG4gAg9nnw6U9c9uGv+/c8/psP4v/++y8Epg4ZM2AzEIT/QgwM2HD/Z9m0K9+6F9382bj54eeyK+/fpADFA//i0MeAx7DAx19+xm5/9KP4zOsfaY/e/49c9nzWxMob5Q///fsfjM11WA1E864PEDtNuX5my4Kb9xdNfzRlfsH1wv9QuUAiXfgX7Lqff7+FrXjQcOTcuyUNTefP3ei8cOX87MeTZxVcI9HAv1ADv//5HD7vbsHb/S8nTu+5fHXPpCvXdy56OmtS6fWy11ADsXoZAEwbgAzOQaOiAAAAAElFTkSuQmCC',
            width: 304,
            height: 100,
            src:
              '/static/87f1f534de35e76581c200f2eb417704/e67b3/assess-3-img.png',
            srcSet:
              '/static/87f1f534de35e76581c200f2eb417704/e67b3/assess-3-img.png 1x',
          },
        },
      },
    ],
  },
}

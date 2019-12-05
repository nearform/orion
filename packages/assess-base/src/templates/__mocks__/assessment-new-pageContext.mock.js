export default {
  pillarColors: ['rgb(80, 184, 242)', 'rgb(73, 98, 173)', 'rgb(112, 214, 112)'],
  assessment: {
    orderIndex: 3,
    key: 'efqm-2020-advanced',
    name: 'business matrix advanced',
    logoAsset: 'assess-3-img',
    guidance: null,
    shortDescription:
      'This tool provides a complete assessment against all criterion-part of the EFQM Model and score on the full RADAR attributes.  Through this tool, organisation can generate a detailed enabler maps and results report.',
    keyInformation: {
      guidance:
        'Key Information is those key facts about your organisation which help Assessorsto gain an overall view of your organisation and its strategic context.',
      keyInformationItems: [
        {
          key: 'overview',
          name: 'facts & figures',
        },
        {
          key: 'challenges-and-strategy',
          name: 'challenges & strategy',
        },
        {
          key: 'operations-partners-suppliers',
          name: 'operations, partners & suppliers',
        },
        {
          key: 'market-offerings-and-customers',
          name: 'market, offerings and customers',
        },
        {
          key: 'management-structure',
          name: 'management structure and activities',
        },
      ],
    },
    columns: [
      {
        key: 'approach',
        name: 'what we do (approach)',
        type: null,
      },
      {
        key: 'deployment',
        name: 'how we do it (deployment)',
        type: null,
      },
      {
        key: 'assessment-refinement',
        name: 'how & when we review it (assessment & refinement)',
        type: null,
      },
      {
        key: 'evidence',
        name: 'how we show this (evidence)',
        type: null,
      },
      {
        key: 'owner',
        name: 'owner',
        type: null,
      },
      {
        key: 'links',
        name: 'efqm links',
        type: 'link',
      },
    ],
    feedbackTables: [
      {
        key: 'strengths',
        columns: [
          {
            key: 'strengths',
            name: 'strengths',
          },
        ],
      },
      {
        key: 'areas-of-improvement',
        columns: [
          {
            key: 'areas-of-improvement',
            name: 'areas of improvement',
          },
        ],
      },
      {
        key: 'good-practice',
        columns: [
          {
            key: 'good-practice',
            name: 'good practice',
          },
        ],
      },
    ],
    scoringRules: {
      capBy: ['approach', 'sound'],
    },
    scoring: [
      {
        key: 'approach',
        name: 'approach',
        scores: [
          {
            key: 'sound',
            name: 'sound',
            description:
              'The approaches have a clear rationale, aim to fulfil and respond to relevant stakeholder needs, are described appropriately and are designed to be innovative and agile',
          },
          {
            key: 'aligned',
            name: 'aligned',
            description:
              'The approaches support an Organisation’s direction and fit strategically with other relevant approaches',
          },
        ],
      },
      {
        key: 'deployment',
        name: 'deployment',
        scores: [
          {
            key: 'executed',
            name: 'executed',
            description:
              'The approaches are deployed in relevant areas in an effective and timely manner',
          },
          {
            key: 'flexibility',
            name: 'flexibility',
            description:
              'The execution enables flexibility and adaptation according to the circumstances',
          },
        ],
      },
      {
        key: 'assessment-refinement',
        name: 'assessment and refinement',
        scores: [
          {
            key: 'measurement-learning',
            name: 'measurement & learning',
            description:
              'Feedback on the effectiveness & efficiency of the approaches and their deployment are collected, lessons are learnt and shared',
          },
          {
            key: 'improvement-creativity',
            name: 'improvement through Creativity & Innovation',
            description:
              'Findings from emerging trends analysis, measurement, learning and benchmarking are used to inspire creativity and innovative solutions to improve performance in appropriate timescales',
          },
        ],
      },
    ],
    pillars: [
      {
        key: 'direction',
        name: 'direction',
        columns: null,
        feedbackTables: null,
        scoringRules: null,
        scoring: [
          {
            key: 'approach',
            name: 'approach',
            scores: [
              {
                key: 'sound',
                name: 'sound',
                description:
                  'The approaches have a clear rationale, aim to fulfil and respond to relevant stakeholder needs, are described appropriately and are designed to be innovative and agile',
              },
            ],
          },
          {
            key: 'deployment',
            name: 'deployment',
            scores: [
              {
                key: 'executed',
                name: 'executed',
                description:
                  'The approaches are deployed in relevant areas in an effective and timely manner',
              },
            ],
          },
          {
            key: 'assessment-refinement',
            name: 'assessment and refinement',
            scores: [
              {
                key: 'measurement-learning',
                name: 'measurement & learning',
                description:
                  'Feedback on the effectiveness & efficiency of the approaches and their deployment are collected, lessons are learnt and shared',
              },
              {
                key: 'improvement-creativity',
                name: 'improvement through Creativity & Innovation',
                description:
                  'Findings from emerging trends analysis, measurement, learning and benchmarking are used to inspire creativity and innovative solutions to improve performance in appropriate timescales',
              },
            ],
          },
        ],
        criteria: [
          {
            key: 'purpose-strategy',
            name: 'purpose, vision & strategy',
            description:
              'An outstanding organisation is defined by a Purpose that inspires, a Vision that is aspirational and a Strategy that delivers.\n\nThe Purpose of the organisation:\n\n- Explains why its work is important\n- Sets the scene for it to create and deliver sustained value for its stakeholders\n- Provides a framework in which it takes responsibility for its contribution to, and impact on, the ecosystem in which it operates.\n\nThe Vision of the organisation:\n- Describes what the organisation is attempting to achieve in the long-term\n- Is intended to serve as a clear guide for choosing current and future courses of action\n- Provides, along with the organisation’s Purpose, the basis for setting the Strategy.\n\nThe Strategy of the organisation:\n\n- Describes how it intends to fulfil its Purpose\n- Details its plans to achieve the strategic priorities and move closer to its Vision\n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'purpose-vision',
                    name: '1.1. Define Purpose & Vision',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Defines a Purpose that provides an inspirational motive for the importance and value of its work and is appealing to all its stakeholders\n- Uses its Purpose to create an aspirational Vision that resonates with its stakeholders\n- Involves its Stakeholders in defining, shaping and communicating its Purpose and Vision\n- Identifies areas in which outstanding and sustainable levels of performance must be achieved to fulfil the Vision\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'stakeholder-needs',
                    name: '1.2: Identify & Understand Stakeholder Needs',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Identifies the stakeholders within its ecosystem and prioritises on those that it sees as the Key Stakeholders, i.e. those with the potential to help or hinder the achievement of the Purpose, Vision and Strategy\n- Understands how its Purpose and Vision affects these Key Stakeholders \n- Identifies Key Stakeholder needs and expectations, considering them within the context of the organisation’s own Purpose and Vision\n- Analyses the factors that influence the behaviours, relationships and decision-making of Key Stakeholders and how it may be affected by them\n- Studies and understands Key Stakeholder competences and strategies and responds appropriately to how these could affect its Purpose, Vision, Strategy and business model.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'capabilities-challenges',
                    name:
                      '1.3: Understand the Ecosystem, own Capabilities & Major Challenges',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Researches and understands the ecosystem, including Megatrends, and the consequences on it of the United Nations Sustainable Development Goals and Global Compact ambitions\n- Analyses different scenarios and responds appropriately to any effect these may have on the organisation’s Purpose, Vision, Strategy and Results\n- Knows the potential of its current capabilities and develops approaches to optimise the impact they have on the organisation’s Purpose, Vision, Strategy and Results \n- Investigates and understands current and future market-place dynamics, their potential impact on the organisation’s Purpose, Vision and Strategy and develops appropriate responses\n- Assesses and evaluates the data, information and knowledge gathered from across its ecosystem to understand the major challenges for today and in the future.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'develop-strategy',
                    name: '1.4: Develop Strategy',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Develops Strategy and a set of related strategic priorities that tackle any major challenges identified, making sure appropriate action is taken when necessary and actioned to set the pace within its ecosystem \n- Translates Strategy and strategic priorities into performance targets and transformation initiatives\n- Involves Key Stakeholders in defining the Strategy to enable subsequent engagement, deployment and communication \n- Develops business models that fit with the Purpose, Vision and Strategy\n- Updates and adapts the strategic priorities to reflect market trends, social networks, internal learning and information from Key Stakeholders.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'governance-performance',
                    name:
                      '1.5: Design & Implement a Governance & Performance Management System',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n- Designs and implements a governance and performance management system that aligns with its aspirations and addresses the Strategy, developments in the ecosystem, own capabilities and major challenges \n- Puts in place a governance structure that enables Key Stakeholders to contibute to strategy and decision-making\n- Defines and implements a governance review schedule that matches the speed of the ecosystem, monitors progress with Strategy implementation and guides performance and transformation priorities\n- Ensures performance and transformation management and measurement reporting systems are built into the organisation’s way of working to enable timely accountability and transparency with Key Stakeholders\n- Makes sure that, as a minimum, it meets all relevant government, legal and regulatory requirements.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
          {
            key: 'leadership-culture',
            name: 'Organisational Culture & Leadership',
            description:
              '\n\nOrganisational Culture is the specific collection of values & norms that are shared by people and groups within an organisation that influence, over time, the way they behave with each other and with Key Stakeholders outside the organisation.\n\nOrganisational leadership relates to the organisation as a whole rather than any individual or team that provides direction from the top. It is about the organisation acting as a leader within its ecosystem, recognised by others as a role model, rather than from the traditional perspective of a top team managing the organisation.\n\nIn an outstanding organisation, leadership is positioned as an activity not a role and leadership behaviours are evident across all levels and parts of the organisation. This role model leadership behaviour inspires others, reinforces, and when necessary, adapts the values and norms, helping to steer Organisational Culture.\n\nAn organisation that aspires to be recognised as outstanding, a leader within its ecosystem, achieves success through a focus on the following activities:  \n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'culture-values',
                    name:
                      '2.1: Steer the Organisation’s Culture & Nurture Values',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Understands and steers the culture to align with its Purpose and recognises when there is a need for the culture to be adapted\n- Nurtures its values, translating these into desired norms & behaviours that it promotes, communicates and clearly demonstrates through its actions\n- Demonstrates the desired behaviours for acting ethically, with integrity and a social conscience, making sure its People demonstrate these desired behaviours in their own actions\n- Expresses and promotes concern for the environment and the scarcity of resources, raising awareness of the importance of adopting a responsible approach to the environment\n- Aligns appraisal, recognition and reward systems with its values to steer it towards the organisation’s desired culture, celebrating success along the way\n- Identifies, recognises and promotes other role models from within its ecosystem that are leading the way to a more sustainable future for everyone.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'realise-change',
                    name: '2.2: Create the Conditions for Realising Change',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Works with Key Stakeholders to create the conditions where the norm is successful change\n- Creates the conditions where a “no-blame” attitude and space for trying, making mistakes and learning from them can flourish\n- Facilitates a spirit of learning in the pursuit of its Strategy, encouraging the improvement and, at times, transformation of the organisation \n- Determines the pace of change and demonstrates through its actions, the need, benefits and consequences of any change in relation to its Purpose, Vision and Strategy\n- Learns from previous experiences of change and establishes strategies to manage change successfully. \n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'creativity-innovation',
                    name: '2.3: Enable Creativity & Innovation',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Understands the importance and benefits of having a focus on creativity, innovation and disruptive thinking to help it achieve its Purpose, Vision and Strategy\n- Sets ambitious goals and targets that encourage creative, innovative and disruptive thinking \n- Enables a culture where creativity, innovation and disruptive thinking is encouraged and, when a failure occurs, the cause is quickly identified and shared to avoid repetition of the same mistake happening again \n- Develops the culture for, and expertise in, using the tools and techniques that facilitate improvement \n- Engages in learning and collaboration networks to identify opportunities for creativity, innovation and disruptive thinking\n- Seeks external benchmarking opportunities to keep pace with the latest innovation opportunities.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'unite-engage',
                    name:
                      '2.4: Unite Behind & Engage in Purpose, Vision & Strategy',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n- Invests in making sure its Purpose, Vision and Strategy are communicated effectively to Key Stakeholders, helping to create an atmosphere of openness, trust, confidence and commitment \n- Encourages and shows appreciation for honest feedback on concerns related to the Purpose, Vision and Strategy\n- Conveys to Key Stakeholders the impact and relevance of their specific contributions to the Purpose, Vision and Strategy, explaining the importance of gaining and maintaining their engagement\n- Ensures its Key Stakeholders know the importance of keeping aligned to its Purpose, Vision & Strategy\n- Recognises, celebrates and shares with Key Stakeholders every moment of success to help reinforce the desired behaviours.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
        ],
      },
      {
        key: 'execution',
        name: 'execution',
        columns: null,
        feedbackTables: null,
        scoringRules: null,
        scoring: null,
        criteria: [
          {
            key: 'engaging-stakeholders',
            name: 'Engaging Stakeholders',
            description:
              'Having decided which Stakeholders are the most important to the organisation, i.e. its Key Stakeholders, and independent of the specific groups identified, it is highly likely that there is a degree of similarity in applying the following principles when engaging with Key Stakeholders.\n\nAn outstanding organisation: -\n- Identifies the specific types and categories within each of its Key Stakeholder Groups\n- Uses its understanding of Key Stakeholders needs and expectations to achieve continued engagement\n- Involves Key Stakeholders in deploying its Strategy and Creating Sustainable Value and recognises the contributions they make \n- Builds, maintains and further develops the relationship with Key Stakeholders based on transparency, accountability, ethical behaviour and trust\n- Works with its Key Stakeholders to develop a common understanding and focus on how, through co-development, it can contribute to, and draw inspiration from, the United Nations Sustainable Development Goals and Global Compact ambitions\n- Actively gathers the perceptions of its Key Stakeholders rather than waiting for them to make contact \n- Evaluates its performance in relation to Key Stakeholders needs and decides on the appropriate actions to be taken to help secure its future, as perceived by these Key Stakeholders.\n\nIn practice, we find that an outstanding organisation will include the following groups in the classification of its Key Stakeholders: \n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'customer-relationships',
                    name: '3.1: Customers - Build Sustainable Relationships',
                    guidance:
                      'These are the recipients of the products, services and solutions provided by the organisation. These may include:\n- Direct and indirect customers\n- Users and other persons involved in the different touchpoints of a customer journey \n- Prosumers \n- Persons or groups involved in buying decisions\n\nIn practice, we find that an outstanding organisation: \n- Identifies and classifies its customers based on defined criteria, e.g. social characteristics, needs and expectations, buying and user behaviour\n- Maintains a relationship with its customers during all stages of Creating Sustainable Value, even in those phases where there is no ongoing value creation\n- Understands the communication and contact needs of the different customer segments\n- Establishes communication channels that make it easy for customers to interact, give feedback on their experiences and for the organisation to react quickly and appropriately.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'develop-people',
                    name: '3.2: People – Attract, Engage, Develop & Retain',
                    guidance:
                      'These are the individuals or groups of people that are employed by the organisation. \n\nIn practice, we find that an outstanding organisation: \n- Develops a People strategy and plans that support the overall strategy and plans of the organisation\n- Adapts to the evolving needs and expectations of its People, both current and future, taking account, for example, of changing expectations on Organisational Culture & Leadership, gender balance & parity, diversity & inclusion and the desired working environment\n- Enables its People - based on Purpose, Vision & Strategy - to understand the need for change and to see the opportunities for further development of their knowledge and capabilities.\n- Empowers its People to communicate and to share effectively their experiences and learning with others in the ecosystem \n- Creates an ambiance in which its People can thrive, and their well-being is supported\n- Ensures its People are proactively guided, rewarded, recognised and cared for.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'stakeholder-support',
                    name:
                      '3.3: Business & Governing Stakeholders – Secure & Sustain Ongoing Support',
                    guidance:
                      'These are the individuals or groups to whom the organisation is accountable in relation to its fiscal, legal, ethical and general stewardship requirements\n\n- Business stakeholders can include owners, shareholders, investors, funding organisations\n- Governing stakeholders can include government departments, regional or local bodies (statutory & regulatory), public authorities or parastatal institutions.\n\nIn practice, we find that an outstanding organisation: \n- Identifies the Key Business and Governing Stakeholders that have a financial, legal and general stewardship interest in the organisation and understands their expectations\n- Involves Key Business and Governing Stakeholders in the development of its improvement & transformation ambitions and overall strategic direction\n- Makes sure the relationships established with Key Business and Governing Stakeholders is are mutually beneficial\n- Makes itself transparent and accountable to this Key Stakeholder group, establishing and maintaining high levels of trust at all times.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'develop-society',
                    name:
                      '3.4: Society - Contribute to Development, Well-Being & Prosperity',
                    guidance:
                      'These are the individuals or groups outside the organisation that represent the immediate community or the wider society, including, for example, Special Interest Groups that focus on topics such as the environment.\n\nIn practice, we find that an outstanding organisation\n- Uses its Purpose, Vision & Strategy to develop a clear understanding and focus on how it will contribute to its Society\n- Establishes, develops and maintains a relationship with the Key Stakeholders in its Society, leading to mutual benefit for both the organisation and its Society\n- Utilises communication channels that make it easy for its Society to interact, give feedback on their experiences and for the organisation to react quickly and appropriately.\n- Makes itself transparent and accountable to this Key Stakeholder group and establishes and maintains a high level of trust.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'governance-performance',
                    name:
                      '3.5: Partners & Suppliers – Build Relationships & Ensure Support for Creating Sustainable Value',
                    guidance:
                      'These are the external parties that the organisation chooses to work with to fulfil its Purpose, achieve the Vision, deliver the Strategy and reach shared objectives that benefit both parties\n\nIn practice, we find that an outstanding organisation: \n- Segments its Key Partners and Suppliers in line with its Purpose, Vision and Strategy\n- Ensures its Key Partners and Suppliers act in line with the organisation’s Strategy and that mutual transparency, integrity, and accountability in the relationship is established and enhanced\n- Builds a trusting relationship with its Key Partners and Suppliers to support the objective of Creating Sustainable Value \n- Works proactively with its Key Partners and Suppliers to leverage the culture and expertise of both parties to achieve mutual benefit. \n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
          {
            key: 'creating-value',
            name: 'Creating Sustainable Value',
            description:
              'An outstanding organisation recognises that Creating Sustainable Value is vital for its long-term success and financial strength. \n\nThe organisation’s clearly defined Purpose, enriched by the Strategy, defines for whom the organisation should be Creating Sustainable Value. In most cases, customers, segmented appropriately, are the target group for Creating Sustainable Value, although some organisations might also focus on selected Key Stakeholders within its Society or Business & Governing Stakeholder segments.\n\nAn outstanding organisation acknowledges that Key Stakeholder needs may change over time and that it is important to collect and analyse feedback to improve or change their products, services or solutions. \n\nThe different elements to Creating Sustainable Value are shown below in a step by sequence. It is recognised that the organisation’s plans for today and the future may well run in parallel or overlap at times, depending on the nature of the organisation’s business.\n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'design-value',
                    name: '4.1: Design the Value & How it is Created ',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Understands what differentiates it from others, including, where relevant, its competitors, and makes these differentiators an integral part of the value it creates\n- Involves its Key Stakeholders in the development process to (co-)create and maximise value. \n- Develops the portfolio of its products, services and solutions in line with its Purpose and the current and future needs of existing and potential target groups \n- Designs the value and the value creation approaches to reflect their lifecycle in a responsible way, considering impacts on public health, safety and the environment \n- Uses quantitative and qualitative market research, (customer) surveys and other forms of feedback, as well as insights, to develop and improve its value proposition and value creation.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'sell-value',
                    name: '4.2: Communicate & Sell the Value',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Expresses the differentiators and the value propositions to be created into attractive and engaging messages that are then communicated to existing and potential customers as well as other target groups\n- Leverages the power of networking and influencing in the on-line and off-line worlds in a responsible manner to increase the positive image of the organisation, its differentiators and its value proposition \n- Uses dedicated strategies and approaches to sell to target groups its differentiators and the value proposition(s) as well as the products, services and solutions \n\n- Makes it easy for its target groups to work with the organisation by offering support, both before and after they decide to do business, thus facilitating the successful selling of the value proposition.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'deliver-value',
                    name: '4.3: Deliver the Value',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Implements effective and efficient ways to create value, making sure it can consistently deliver on its purpose and value propositions\n- Delivers sustainable value, as promised, through its portfolio of products, services and solutions and by meeting or exceeding the needs and expectations of its target groups\n- Delivers its products, services and solutions in a way that minimises negative social and environmental impact\n- Advises its target groups of the responsible use of its products, services and solutions\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'implement-experience',
                    name: '4.4: Define & Implement the Overall Experience',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Uses insights about the target groups for defining and implementing the overall experience in working with the organisation\n- Puts in place a consistent, seamless and effective progression through the different phases of value creation, incorporating relevant measures at appropriate touch points in this journey\n- Takes advantage of opportunities to personalise the overall experience for its target groups, as well as the specific products, services and solutions \n\n- Makes sure its people have the necessary resources, competencies and empowerment they need to maximise the overall experience for its target groups\n\n- Designs, implements and uses timely feedback systems to improve the different phases of value creation as well as the products, services and solutions offered by the organisation. \n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
          {
            key: 'driving-performance',
            name: 'Driving Performance & Transformation',
            description:
              'Now and in the future, an organisation needs to be able to meet the following two important requirements at the same time to become and remain successful. \n\n- On the one side, it needs to continue managing successfully the delivery of its current business operations. (“Driving Performance.”) \n- On the other side, there are constant changes inside and outside the organisation that need to be managed in parallel if it is to remain successful. (“Driving Transformation.”)\n\nThe combination of Driving Performance & Transformation confirms the necessity for the organisation to deliver for today while preparing for the future.\n\nMajor elements in enabling performance & transformation are innovation and technology, the ever-increasing importance of data, information & knowledge and the focussed use of critical assets and resources.\n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'performance-risk',
                    name: '5.1: Drive Performance & Manage Risk',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Uses the performance management system to ensure a coherent link between its Purpose, Strategy, Sustainable Value Creation objectives and Results\n- Uses the performance management system to guide informed, effective, responsive and fact-based improvements\n- Manages projects and improves processes based on information from its performance management system \n- Identifies risk and assesses the potential impact on the strategic priorities, the way things are executed and the desired results as well as potential opportunities\n- Develops and implements plans to manage risk from different perspectives such as cultural, strategic, operational, financial, legal, regulatory, societal and technical (including risks from IT and cyber security challenges) dimensions.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'transform-future',
                    name: '5.2: Transform the Organisation for the Future',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Identifies the transformation and change needs, taking into account its Purpose, Strategy, Sustainable Value Creation objectives and Results and scanning its ecosystem to forecast the main challenges and opportunities for the future \n- Adapts current strategy and existing business models to meet future needs, and implements new business models based on the challenges and opportunities that are forecast\n- Builds its organisational structure to best serve its Purpose, Vision and Strategy and considers innovative approaches to adapting its current organisational design based on the main challenges and opportunities that are forecast\n- Establishes and utilises agile working approaches, at the same time providing the necessary stability to manage current operations\n- Restructures in a timely manner its value creation and other organisational processes based on operational and future needs\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'innovation-technology',
                    name: '5.3: Drive Innovation & Utilise Technology',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n- Provides the capabilities, resources and tools that develop and sustain creativity, innovation and disruptive thinking \n- Takes advantage of innovations that support improvement in the current business and the need for transformation in the future\n- Evaluates and exploits the potential that new technologies have to support ongoing value creation, improvements to its infrastructure and the responsiveness and adaptability of its processes & projects\n- Introduces relevant developments in technology at a speed that maximises the benefit to be gained\n- Evaluates and manages, based on circular economy principles, the full lifecycle of existing and emerging technologies, to maximise the benefit for all. \n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'data-knowledge',
                    name: '5.4: Leverage Data, Information & Knowledge',
                    guidance:
                      'In practice, we find that an outstanding organisation: \n- Ensures it has identified the data it needs to support its transformation plans as well as managing the products, services and solutions it currently offers, and is proficient in acquiring any essential information that may be lacking\n- Uses advanced analytics, including predictive models, to extract value from data, gain actionable insights and make informed decisions\n- Converts data into information and knowledge and uses the outcomes to identify potential opportunities for creating further sustainable value\n- Makes use of the knowledge held by Key Stakeholders to generate ideas and innovations, including the potential for working together, to develop products, services and solutions that Create Sustainable Value\n- Ensures that data, information and knowledge are treated and used in an ethical way, respecting the needs and rights of those providing the data, information and knowledge\n- Secures, protects and maximises the unique knowledge, such as the intellectual property, that it owns.\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'assets-resources',
                    name: '5.5: Manage Assets & Resources',
                    guidance:
                      'In practice, we find that an outstanding organisation:\n\n- Uses financial resources in a balanced and sustainable way to help ensure current success and investment in the future\n- Identifies and manages, responsibly, the critical assets and resources that are vital for its Strategy, Performance and Transformation needs, including financial assets (cash, capital, investments), tangible assets (trading infrastructure, such as supply chain, real estate, technology and machinery) and intangible assets (proprietary data, self-developed software/technology, brand, goodwill, patents)\n- Discovers and embeds coherent and innovative ways to maximise the value of its assets & resources to enhance performance and transformation objectives in line with changing organisational and market demands, both short and long term\n- Determines the assets and resources it no longer needs (for current or future business) and, based on Circular Economy principles, disposes of them responsibly\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
        ],
      },
      {
        key: 'results',
        name: 'results',
        columns: [
          {
            key: 'title',
            name: 'indicator title',
            type: null,
          },
          {
            key: 'description',
            name: 'indicator description',
            type: null,
          },
          {
            key: 'image',
            name: 'add image',
            type: 'image',
          },
          {
            key: 'gap',
            name: '',
            type: 'gap',
          },
          {
            key: 'owner',
            name: 'owner',
            type: null,
          },
          {
            key: 'links',
            name: 'efqm links',
            type: 'link',
          },
        ],
        feedbackTables: null,
        scoringRules: {
          capBy: ['relevance-usability', 'scope-relevance'],
        },
        scoring: [
          {
            key: 'relevance-usability',
            name: 'relevance & usability',
            scores: [
              {
                key: 'scope-relevance',
                name: 'scope & relevance',
                description:
                  'A set of results that clearly link to the strategy of the organisation are identified and demonstrate the needs and expectations of the stakeholders. The selected set of results is reviewed and improved overtime',
              },
              {
                key: 'usable-data',
                name: 'usable data',
                description:
                  'Results are timely, reliable, accurate and appropriately segmented to provide meaningful insights that support improvement',
              },
            ],
          },
          {
            key: 'performance',
            name: 'performance',
            scores: [
              {
                key: 'trends',
                name: 'trends',
                description:
                  'Positive trends or sustained good performance over the strategic period/cycle.',
              },
              {
                key: 'targets',
                name: 'targets',
                description:
                  'Relevant targets are set in line with the strategic intent & benchmarks and consistently achieved',
              },
              {
                key: 'comparisons',
                name: 'comparisons',
                description:
                  'Relevant external comparisons suitable to classify own performance in line with the strategic direction are made and are favourable',
              },
              {
                key: 'future-focus',
                name: 'future focus',
                description:
                  'Based on current cause & effect relationships, analysis of data sets, performance patterns & predictive measures, the organisation understands the drivers for exceptional performance in the future',
              },
            ],
          },
        ],
        criteria: [
          {
            key: 'stakeholder-perceptions',
            name: 'Stakeholder Perceptions',
            description:
              'This criterion concentrates on results based on feedback from Key Stakeholders about their personal experiences of dealing with the organisation - their perceptions\n\nThese perceptions could relate to past as well as current Key Stakeholders and could be obtained from a number of sources, including surveys, focus groups, ratings, press or social media, external recognition, advocacy, structured review meetings, investor reports and compliments/complaints, including feedback compiled by customer relationship management teams\n\nIn addition to the perceptions that a Key Stakeholder may have of an organisation based on personal experiences, perceptions may also be shaped by the environmental and social impact reputation of the organisation. For instance, the degree to which the organisation is perceived by its Key Stakeholders as contributing successfully to one or more of the United Nations Sustainable Development Goals and Global Compact ambitions.\n\nIn practice, we find that an outstanding organisation: -\n\n- Knows how successful it is at executing its Strategy to meet the needs and expectations of its Key Stakeholders\n- Uses its analysis of past and current performance to predict future performance\n- Uses Key Stakeholder Perception Results to stay informed and influence its current Direction and the Execution of its Strategy.\n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'customer-perception',
                    name: 'Customer Perception Results',
                    guidance:
                      'What are the perceptions of the Customers in relation to, for instance:\n- The delivery of the overall customer experience\n- The culture of the organisation; the attitude and level of commitment to the customer by People\n- The branding and reputation of the organisation, including its social and environmental performance\n- The products, services and solutions offered by the organisation\n- The use of innovation to improve the organisation’s processes, products, services and solutions\n- The usage of technology by the organisation to help deliver sustainable value\n- The delivery and after-sales support for the different channels\n- The effectiveness and efficiency of the communication channels used\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'people-perception',
                    name: 'People Perception Results',
                    guidance:
                      'What are the perceptions of the People in relation to, for instance: \n\n- The culture of the organisation\n- Their experience of working for the organisation, including how change is managed\n- The organisation’s commitment and achievements concerning gender balance, parity, diversity and inclusion \n- The way the organisation is adapting to future ways of working, for example, the co-existence of People working alongside robots, the use of artificial intelligence and augmented virtual reality\n- The organisation’s support for family and personal life\n- The organisation’s support, empowerment, recognition and development \n- The working environment, pay and benefits\n- The management and improvement of personal performance\n- The reputation of the organisation, including as a Leader in its ecosystem\n- Communication within the organisation\n- Talent attraction and engagement\n- The way in which strategy is executed, their contribution to it and their degree of confidence in the future direction of the organisation\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'governing-perception',
                    name: 'Business & Governing Stakeholder Perception Results',
                    guidance:
                      'What are the perceptions of the Business and Governing Stakeholders e.g. owners, shareholders,  investors, funding organisations, government departments, regional or local bodies (statutory & regulatory), public authorities or parastatal institutions in relation to, for instance:\n\n- The financial management, security and sustainability of the organisation\n- The governance structure, transparency, accountability and ethical behaviour of the organisation\n- The social and environmental responsibility of the organisation\n- The management of risk and compliance\n- The branding and reputation of the organisation\n- The products, services and solutions offered by the organisation and its approach to innovation in processes, products, services and solutions\n- The ability of the organisation to scan the horizon, spot megatrends and deal with them successfully \n- Their overall experience of dealing with the organisation\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'society-perception',
                    name: 'Society Perception Results',
                    guidance:
                      'What are the perceptions of its Society, be it local, national or international, in relation to, for instance:\n\n- The organisation’s ability to meet the expectations of its Society\n- The impact the governance of the organisation, and the degree of transparency and ethical behaviour have on the community \n- The impact the operations of the organisation has on the community\n- The sustainability of the organisation’s contributions to the community in terms of its economic, social and environmental practices\n- The organisation’s commitment to move towards a Circular Economy \n- The organisation’s commitment to, and achievements in, reducing inequality, increasing diversity & inclusion and achieving a gender balance\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'partner-perception',
                    name: 'Partner & Supplier Perception Results',
                    guidance:
                      'What are the perceptions of the Key Partners & Suppliers in relation to, for instance:\n\n- Their experience of dealing with the organisation\n- The commitment and achievement of the organisation to co-creation and working towards mutual benefit\n- The rate of implementation of new technologies and changes\n- The social commitment of the organisation\n- The organisation’s commitment and achievement to move towards a Circular Economy \n- The management and improvement of Key Partners & Suppliers performance\n- Communication and relationship management with the organisation\n- The governance structure, transparency and ethics of the organisation and its practices\n- The sustainability of the relationship between the organisation and the Key Partners and Suppliers\n',
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
          {
            key: 'strategic-performance',
            name: 'Strategic & Operational Performance',
            description:
              'This criterion concentrates on results linked to the organisation’s performance in terms of:\n- The ability to fulfil its Purpose, deliver the Strategy and Create Sustainable Value\n- Its fitness for the future\n\nThese results are used by the organisation to monitor, understand and improve its overall performance and to forecast the impact this performance will have on both the perceptions of its Key Stakeholders as well as its future strategic ambitions.\n\nIn practice, we find that an outstanding organisation: -\n- Uses both financial and non-financial indicators to help it measure its strategic and operational performance. \n- Understands the linkages between Key Stakeholder perceptions and actual performance and is able to predict, with a high degree of certainty, how future performance will evolve.\n- Considers the current and future needs and expectations of its Key Stakeholders when deciding on the most appropriate performance indicators to match its strategic & operational objectives\n- Understands the cause and effect relationships that impact on performance and uses the results achieved to stay informed and influence its current Direction & Execution \n- Uses the results currently being achieved to forecast its future performance with an expected degree of certainty. \n',
            columns: null,
            feedbackTables: null,
            parts: [
              {
                guidance: null,
                tables: [
                  {
                    key: 'achievements-value',
                    name:
                      'Achievements in delivering its Purpose and Creating Sustainable Value',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'financial-performance',
                    name: 'Financial Performance',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'fulfil-expectations',
                    name: 'Fulfilment of Key Stakeholders Expectations',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'strategic-objectives',
                    name: 'Achievement of Strategic Objectives',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'achievements-driving',
                    name: 'Achievements in Driving Performance',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'achievements-transformation',
                    name: 'Achievements in Driving Transformation',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
              {
                guidance: null,
                tables: [
                  {
                    key: 'predictive-measures',
                    name: 'Predictive Measures for the Future',
                    guidance: null,
                    columns: null,
                  },
                ],
                feedbackTables: null,
              },
            ],
          },
        ],
      },
    ],
  },
}
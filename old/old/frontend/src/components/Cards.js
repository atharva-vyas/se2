import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import header from "./header.png"
import hand from "./hand.png"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// let title = props.title
// let user = props.user
// let message = props.message
// let response = props.response

const cardData = [
  [{
    "title": "# important_lawyer_stuff.docx",
    "extension": "docx",
    "user": "Your Lawyer (probably)",
    "icon": "lawyer",
    "message": [
      ["what is the name of this case?", "Roe v. Wade"],
      ["what is case about?", "This case is about whether state criminal abortion laws that only allow for a life-saving procedure on the mother's behalf without regard to the stage of her pregnancy violate the Due Process Clause of the Fourteenth Amendment. It also addresses issues of justiciability, standing, and abstention."],
      ["who is the victim?", "The victim in this case is Roe, a pregnant woman."],
      ["why was this case filed?", "This case was filed because Dr. Hallford sought declaratory and injunctive relief with respect to the same statutes under which he stands charged in criminal prosecutions simultaneously pending in state court."],
      ["who is the judge?", "BLACKMUN, J."],
      ["what is the most common dissenting opinion of the judges?", "The most common dissenting opinion of the judges in this case is that the Texas statute should not be struck down in toto, but should instead be declared unconstitutional as applied to the fact situation before the Court."],
      ["how many dissenting opinions were there?", "There were two dissenting opinions."],
      ["what were the dissenting opinions by the judges?", "White, J., filed a dissenting opinion, in which Rehnquist, J., joined, post, p. 221. Rehnquist, J., filed a dissenting opinion, post, p. 171."],
      ["what was Rehnquist's dissenting opinion?", "Rehnquist's dissenting opinion was that, even if the Court's ruling was proper, the actual disposition of the case by the Court was difficult to justify. He argued that the Texas statute should not be struck down in its entirety, but should instead be declared unconstitutional as applied to the fact situation before the Court."],
      ["What was White J.'s dissenting opinion?", "White J.'s dissenting opinion was that the Texas statute should not be struck down in toto, but should instead be declared unconstitutional as applied to the fact situation before the Court."],
      ["whats toto?", 'Toto in this context means "in total" or "in its entirety".'],
      ["who is Roe?", "Roe is Jane Roe, a pregnant single woman who brought a class action challenging the constitutionality of the Texas criminal abortion laws."]
    ]

  }], [{
    "title": "# Q4 2022 Meta Earnings release.pdf",
    "extension": "pdf",
    "user": "An Overworked Analyst",
    "icon": "analyst",
    "message": [
      ["was the CFO's outlook positive or negative?", "The CFO's outlook was positive. They lowered their prior outlook for total expenses and restructuring charges, indicating that they anticipate slower growth and more efficiency."],
      ["what was the CFO's Outlook?", "The CFO's outlook was that full-year 2023 total expenses will be in the range of $89-95 billion, with an estimated $1 billion in restructuring charges in 2023 related to consolidating office facilities."],
      ["What were some key metrics in the report?", "The report included non-GAAP financial measures, which provide investors with useful supplemental information about the financial performance of the business, and allow for greater transparency with respect to key metrics used by management in operating the business."],
      ["how was the Meta's future outlook?", "The future outlook was uncertain due to a variety of factors, including macroeconomic conditions, user engagement levels, reliance on advertising revenue, and competition."]
    ]
  
  }], [{
    "title": "# school assignment.txt",
    "extension": "txt",
    "user": "A Grad Student",
    "icon": "student",
    "message": [
      ["who is the letter addressed to?", "The letter is addressed to Mr. Jeff M. Myers."],
      ["what are the sources of this letter?", "The sources of this letter are University of California, San Francisco, Guttmacher Institute, KFF, and a personal interview"],
      ["who was the personal interview about?", "The personal interview was about Patricia Hughes."]
    ]
  }]
]

const topTitle = ["Make your Legal research much more efficient!", "Make well informed investment decisions by easily analyzing large financial documents!", "From complex jargon packed documents to simple everyday documents, we help you get the most out of your day!"]

function Cards() {
  const [count, setCount] = useState(0)

  const increament = () => {
    if (count == 2) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }

  const decreament = () => {
    if (count == 0) {
      setCount(cardData.length - 1)
    } else {
      setCount(count - 1)
    }
  }

  return (
    <div className='cards'>
      <div className="cardHeader">
        <h1>How our customers use TalkWithMyDocs</h1>
        <div className="cardHeaderImg">
          <img src={hand} className="handPng"/>
        </div>
      </div>

      <div className='cards__container'>
        <div className="cards__container0">
          
          <div className="previous-button">
            <ArrowBackIosNewIcon onClick={decreament}/>
          </div>

          <div className='cards__wrapper'>
          <CardItem
            src='https://wallpaperaccess.com/full/3281628.jpg'
            text={topTitle[count]}
            label='Adventure'
            data={cardData[count]}
            increament={increament}
            decreament={decreament}
          />
          </div>

          <div className="next-button">
            <ArrowForwardIosIcon onClick={increament}/>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default Cards;

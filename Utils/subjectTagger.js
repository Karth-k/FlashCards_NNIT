function subjectTagger(questionText) {
  const keywords = {
    physics: ['newton', 'velocity', 'force', 'gravity'],
    bio: ['photosynthesis', 'cell', 'organism', 'gene'],
    chem: ['atom', 'reaction', 'acid', 'molecule'],
    math: ['equation', 'algebra', 'integral', 'geometry'],
    history: ['empire', 'war', 'revolution', 'colonial']
  };

  const lower = questionText.toLowerCase();

  for (let subj in keywords) {
    for (let word of keywords[subj]) {
      if (lower.includes(word)) {
        // Title-case the subject
        return subj.charAt(0).toUpperCase() + subj.slice(1);
      }
    }
  }

  return 'Misc';
}

module.exports = subjectTagger;
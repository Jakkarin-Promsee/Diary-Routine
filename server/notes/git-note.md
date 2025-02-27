# Commit

## branch

- git push -u origin main
- git checkout -b feature-branch-name (create and switch)
- git checkout -b reversion-branch abc1234 (create on head)

## type

- feat: new feature
- fix: fixes a bug
- chore: Updates build processes (no app logic change)
- docs: updates documentation
- style: code style change (no logic change)
- refactor: code improvement without changing behavior
- perf: performance improving
- test: Adding or improfing test
- ci: chage CI/CD
- build: change to build script
- revert: revert version

## commit command

- git commit -m "type: short description"
- git commit -m "type: short description" -m "more description"
- git commit --amend -m "adding to current commit"

## other command

- log
  - git log
  - git log --oneline
- unstage, keep change
  - git add <file>
  - git restore --staged <file>
  - git reset HEAD~1
- reset all change
  - git restore <file>
  - git rest --hard HEAD~1

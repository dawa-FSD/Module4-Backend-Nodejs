# Module 4 - Day 52: Track Setup & Language Fundamentals I

Student: Dawa Asfaw  
Program: CodeOps - Full Stack Software Development  
Track: Backend (Node.js + Nest.js)

## Files

- `toolchain.txt` - record your actual Node, npm, Nest CLI, and TypeScript versions.
- `package-notes.md` - inspect your generated `package.json` and document scripts/dependencies.
- `var-conversion.md` - convert five `var` declarations from your Module 2 code.
- `menu.ts` - eight Ethiopian dishes, price filtering, and ETB total formatting.
- `function-annotation.ts` - example of parameter and return type annotations.
- `order.ts` - Addis Eats order mini-project using strict TypeScript types.

## Install the local TypeScript tools

From this folder, run:

```powershell
npm init -y
npm install -D typescript tsx
```

## Check TypeScript

```powershell
npx tsc --strict --noEmit order.ts menu.ts function-annotation.ts
```

## Run the programs

```powershell
npx tsx menu.ts
npx tsx order.ts
npx tsx function-annotation.ts
```

## Important submission notes

1. Fill `toolchain.txt` with versions from your own computer.
2. Copy actual scripts and package names from your own `package.json` into `package-notes.md`.
3. Replace/adapt the examples in `var-conversion.md` using five declarations from your own Module 2 code.
4. Annotate one actual Module 2 function as well as reviewing the provided example.
5. Capture the required compiler-error screenshot: temporarily add a sixth member to `OrderStatus` without adding a matching `case` in `statusMessage`, run the strict TypeScript check, and capture the `never` error. Then remove the temporary sixth member so the submitted `order.ts` compiles cleanly.
6. The reading sheet asks for the work under `module-4/day-52/` in your CodeOps GitHub repository.

## Price convention

Prices in the TypeScript examples are stored in santim.  
100 santim = 1 ETB.

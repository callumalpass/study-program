---
title: "Substitution Methods for First-Order Equations"
---

# Substitution Methods for First-Order Equations

## Introduction to Substitution

Some first-order differential equations can be solved by making a substitution that transforms them into a simpler form—typically separable or linear. The key is recognizing patterns that suggest appropriate substitutions. Two important classes of equations solvable by substitution are **homogeneous equations** and **Bernoulli equations**.

## Homogeneous Differential Equations

### Definition

A function $f(x, y)$ is **homogeneous of degree n** if:
$$f(tx, ty) = t^n f(x, y)$$

for all $t \neq 0$.

**Examples**:
- $f(x,y) = x^2 + xy$ is homogeneous of degree 2: $f(tx,ty) = (tx)^2 + (tx)(ty) = t^2(x^2 + xy)$
- $f(x,y) = \frac{x^2 - y^2}{xy}$ is homogeneous of degree 0: $f(tx,ty) = \frac{t^2x^2 - t^2y^2}{t^2xy} = \frac{x^2-y^2}{xy}$
- $f(x,y) = x + y^2$ is not homogeneous

A differential equation is **homogeneous** if it can be written as:
$$\frac{dy}{dx} = f\left(\frac{y}{x}\right)$$

or equivalently, if $M$ and $N$ in $M\,dx + N\,dy = 0$ are both homogeneous of the same degree.

### Solution Method: Substitution v = y/x

For a homogeneous equation $\frac{dy}{dx} = f(y/x)$, we make the substitution:
$$v = \frac{y}{x} \implies y = vx$$

Differentiating:
$$\frac{dy}{dx} = v + x\frac{dv}{dx}$$

Substituting into the original equation:
$$v + x\frac{dv}{dx} = f(v)$$
$$x\frac{dv}{dx} = f(v) - v$$

This is separable:
$$\frac{dv}{f(v) - v} = \frac{dx}{x}$$

After integrating and solving for $v$, substitute back $v = y/x$ to get the solution in terms of $x$ and $y$.

### Example 1: Basic Homogeneous Equation

Solve $\frac{dy}{dx} = \frac{x + y}{x}$.

**Solution**:
Rewrite: $\frac{dy}{dx} = 1 + \frac{y}{x}$

This is homogeneous with $f(v) = 1 + v$.

Let $v = y/x$, so $y = vx$ and $\frac{dy}{dx} = v + x\frac{dv}{dx}$.

Substitute:
$$v + x\frac{dv}{dx} = 1 + v$$
$$x\frac{dv}{dx} = 1$$
$$dv = \frac{dx}{x}$$

Integrate:
$$v = \ln|x| + C$$

Substitute back $v = y/x$:
$$\frac{y}{x} = \ln|x| + C$$
$$y = x\ln|x| + Cx$$

### Example 2: Rational Homogeneous Equation

Solve $\frac{dy}{dx} = \frac{x^2 + y^2}{xy}$.

**Solution**:
Rewrite: $\frac{dy}{dx} = \frac{x}{y} + \frac{y}{x}$

Let $v = y/x$, so $\frac{dy}{dx} = v + x\frac{dv}{dx}$.

$$v + x\frac{dv}{dx} = \frac{1}{v} + v$$
$$x\frac{dv}{dx} = \frac{1}{v}$$
$$v\,dv = \frac{dx}{x}$$

Integrate:
$$\frac{v^2}{2} = \ln|x| + C$$
$$v^2 = 2\ln|x| + 2C$$

Substitute $v = y/x$:
$$\frac{y^2}{x^2} = 2\ln|x| + K$$
$$y^2 = x^2(2\ln|x| + K)$$

### Example 3: Differential Form

Solve $(x^2 + y^2)dx - 2xy\,dy = 0$.

**Solution**:
Check homogeneity: $M = x^2 + y^2$ and $N = -2xy$ are both homogeneous of degree 2.

Rewrite as $\frac{dy}{dx} = \frac{x^2 + y^2}{2xy}$:
$$\frac{dy}{dx} = \frac{x}{2y} + \frac{y}{2x}$$

Let $v = y/x$:
$$v + x\frac{dv}{dx} = \frac{1}{2v} + \frac{v}{2}$$
$$x\frac{dv}{dx} = \frac{1}{2v} - \frac{v}{2} = \frac{1 - v^2}{2v}$$
$$\frac{2v\,dv}{1 - v^2} = \frac{dx}{x}$$

Integrate:
$$-\ln|1 - v^2| = \ln|x| + C$$
$$\ln|1 - v^2| = -\ln|x| + K$$
$$|1 - v^2| = \frac{A}{|x|}$$

Substitute back:
$$1 - \frac{y^2}{x^2} = \frac{A}{x}$$
$$x^2 - y^2 = Ax$$

## Bernoulli Equations

### Definition and Form

A **Bernoulli equation** has the form:
$$\frac{dy}{dx} + P(x)y = Q(x)y^n$$

where $n \neq 0, 1$. When $n = 0$, it's linear. When $n = 1$, it's separable.

Bernoulli equations are nonlinear but can be transformed into linear equations through substitution.

### Solution Method: Substitution v = y^(1-n)

**Step 1**: Divide by $y^n$:
$$y^{-n}\frac{dy}{dx} + P(x)y^{1-n} = Q(x)$$

**Step 2**: Let $v = y^{1-n}$. Then:
$$\frac{dv}{dx} = (1-n)y^{-n}\frac{dy}{dx}$$
$$y^{-n}\frac{dy}{dx} = \frac{1}{1-n}\frac{dv}{dx}$$

**Step 3**: Substitute:
$$\frac{1}{1-n}\frac{dv}{dx} + P(x)v = Q(x)$$
$$\frac{dv}{dx} + (1-n)P(x)v = (1-n)Q(x)$$

This is a linear equation in $v$!

**Step 4**: Solve using the integrating factor method, then substitute back $v = y^{1-n}$.

### Example 4: Bernoulli with n = 2

Solve $\frac{dy}{dx} + \frac{y}{x} = y^2$.

**Solution**:
This is Bernoulli with $P(x) = \frac{1}{x}$, $Q(x) = 1$, and $n = 2$.

Divide by $y^2$:
$$y^{-2}\frac{dy}{dx} + \frac{y^{-1}}{x} = 1$$

Let $v = y^{1-2} = y^{-1}$. Then $\frac{dv}{dx} = -y^{-2}\frac{dy}{dx}$, so:
$$y^{-2}\frac{dy}{dx} = -\frac{dv}{dx}$$

Substitute:
$$-\frac{dv}{dx} + \frac{v}{x} = 1$$
$$\frac{dv}{dx} - \frac{v}{x} = -1$$

This is linear. Integrating factor: $\mu = e^{\int -\frac{1}{x}dx} = e^{-\ln x} = \frac{1}{x}$

Multiply by $\mu$:
$$\frac{1}{x}\frac{dv}{dx} - \frac{v}{x^2} = -\frac{1}{x}$$
$$\frac{d}{dx}\left[\frac{v}{x}\right] = -\frac{1}{x}$$

Integrate:
$$\frac{v}{x} = -\ln|x| + C$$
$$v = -x\ln|x| + Cx$$

Substitute back $v = y^{-1} = \frac{1}{y}$:
$$\frac{1}{y} = -x\ln|x| + Cx$$
$$y = \frac{1}{Cx - x\ln|x|}$$

### Example 5: Bernoulli with n = 3

Solve $\frac{dy}{dx} - y = xy^3$.

**Solution**:
Bernoulli with $P(x) = -1$, $Q(x) = x$, $n = 3$.

Divide by $y^3$:
$$y^{-3}\frac{dy}{dx} - y^{-2} = x$$

Let $v = y^{-2}$. Then $\frac{dv}{dx} = -2y^{-3}\frac{dy}{dx}$, so:
$$y^{-3}\frac{dy}{dx} = -\frac{1}{2}\frac{dv}{dx}$$

Substitute:
$$-\frac{1}{2}\frac{dv}{dx} - v = x$$
$$\frac{dv}{dx} + 2v = -2x$$

Linear equation. Integrating factor: $\mu = e^{2x}$

$$\frac{d}{dx}[e^{2x}v] = -2xe^{2x}$$

Integrate by parts (let $u = -2x$, $dv = e^{2x}dx$):
$$e^{2x}v = -xe^{2x} + \frac{1}{2}e^{2x} + C$$
$$v = -x + \frac{1}{2} + Ce^{-2x}$$

Substitute $v = y^{-2}$:
$$\frac{1}{y^2} = \frac{1}{2} - x + Ce^{-2x}$$
$$y^2 = \frac{1}{\frac{1}{2} - x + Ce^{-2x}}$$

## Other Substitutions

### Linear in x and y: v = ax + by

For equations of the form $\frac{dy}{dx} = f(ax + by + c)$, substitute $v = ax + by$.

**Example 6**: Solve $\frac{dy}{dx} = (x + y)^2$.

Let $v = x + y$. Then $\frac{dv}{dx} = 1 + \frac{dy}{dx}$, so $\frac{dy}{dx} = \frac{dv}{dx} - 1$.

$$\frac{dv}{dx} - 1 = v^2$$
$$\frac{dv}{dx} = v^2 + 1$$

Separable:
$$\frac{dv}{v^2 + 1} = dx$$
$$\arctan v = x + C$$
$$v = \tan(x + C)$$

Therefore $y = v - x = \tan(x + C) - x$.

### Equations with (ax + by + c) terms

For $\frac{dy}{dx} = \frac{a_1x + b_1y + c_1}{a_2x + b_2y + c_2}$, if $\frac{a_1}{a_2} \neq \frac{b_1}{b_2}$, substitute $x = X + h$, $y = Y + k$ where $(h,k)$ is the intersection of the lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$.

### Riccati Equations

A **Riccati equation** has the form:
$$\frac{dy}{dx} = P(x) + Q(x)y + R(x)y^2$$

These cannot generally be solved in elementary functions. However, if one particular solution $y_1$ is known, the substitution $y = y_1 + \frac{1}{v}$ transforms it into a linear equation.

## Summary of Substitution Strategies

| Equation Type | Substitution | Result |
|---------------|--------------|---------|
| $\frac{dy}{dx} = f(y/x)$ | $v = y/x$ | Separable |
| $\frac{dy}{dx} + Py = Qy^n$ | $v = y^{1-n}$ | Linear |
| $\frac{dy}{dx} = f(ax + by)$ | $v = ax + by$ | Separable |
| $M(x,y)dx + N(x,y)dy = 0$ with $M,N$ homogeneous | $v = y/x$ | Separable |

## Application: Logistic Equation with Harvesting

The equation
$$\frac{dP}{dt} = rP\left(1 - \frac{P}{K}\right) - hP$$

can be rewritten as:
$$\frac{dP}{dt} = rP - \frac{r}{K}P^2 - hP$$

This is Bernoulli with $n = 2$. Let $v = P^{-1}$:
$$-\frac{dv}{dt} = r - \frac{r}{K}v^{-1} - h$$

After manipulation, this becomes linear and can be solved to analyze population dynamics under harvesting.

## Conclusion

Substitution methods greatly extend the class of first-order equations we can solve. Recognizing homogeneous equations and Bernoulli equations is essential, as is understanding how to choose appropriate substitutions for other special forms. While these techniques require practice to master, they transform seemingly intractable nonlinear equations into familiar separable or linear forms. The art of solving differential equations often lies in recognizing patterns and choosing clever substitutions.

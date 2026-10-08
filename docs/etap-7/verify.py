"""Stage 7 independent calculation; Python standard library only.

Run: python -X utf8 docs/etap-7/verify.py
Writes wyniki.json beside this script. Does not import or modify the app engine.
Decimal trigonometric series follow the documented audit-13 technique.
"""
from decimal import Decimal as D, getcontext
import json
import math
from pathlib import Path

getcontext().prec = 60


def atan_series(x):
    term = result = x
    for n in range(1, 1000):
        term *= -x*x
        add = term / (2*n+1)
        result += add
        if abs(add) < D('1e-65'):
            return result
    raise AssertionError('Series convergence')


PI = 16*atan_series(D(1)/5)-4*atan_series(D(1)/239)
PHI = (1+D(5).sqrt())/2


def atan(x):
    return PI/4 + atan_series((x-1)/(x+1))


def tan_deg(deg):
    x = deg*PI/180
    sine, cosine, st, ct = x, D(1), x, D(1)
    for n in range(1, 100):
        st *= -x*x / ((2*n)*(2*n+1))
        ct *= -x*x / ((2*n-1)*(2*n))
        sine += st
        cosine += ct
        if max(abs(st), abs(ct)) < D('1e-65'):
            return sine/cosine
    raise AssertionError('Series convergence')


def bisect(f, lo, hi):
    flo = f(lo)
    assert flo*f(hi) <= 0
    for _ in range(205):
        mid = (lo+hi)/2
        fm = f(mid)
        if fm == 0:
            return mid
        if flo*fm > 0:
            lo, flo = mid, fm
        else:
            hi = mid
    return (lo+hi)/2


def section(t, z0=D('7.65'), k=D(1)):
    assert k > 0 and t > 0 and z0*z0 > 4*k*t
    lo = (z0+(z0*z0-4*k*t).sqrt())/2
    hi = (z0+(z0*z0+4*k*t).sqrt())/2
    zm = bisect(lambda z: z**3*(z0-z)-k*k*t*t, lo, z0)
    f = lambda z: k*k/z**2 - ((z-z0)/t)**2
    sine = t/(1+t*t).sqrt()
    length = (hi-lo)/sine
    width = 2*f(zm).sqrt()
    assert abs(f(lo)) < D('1e-54') and abs(f(hi)) < D('1e-54')
    assert lo < zm < z0 < hi and width > 0
    return dict(t=t, angle=atan(t)*180/PI, z0=z0, k=k, zLo=lo,
                zHi=hi, zMax=zm, L=length, W=width, ratio=length/width,
                delta=k*t/z0**2, centre=(lo+hi)/2,
                widthOffset=(zm-(lo+hi)/2)/sine)


def compare(reference, model):
    diff = abs(model-reference)
    err = diff/abs(reference)*100
    return dict(reference=reference, model=model, absoluteDifference=diff,
                relativePercent=err, within=err <= D('.1'))


def contour(row, n):
    lo, hi, centre, z0, t, k, w = (float(row[key]) for key in
                                  ['zLo', 'zHi', 'centre', 'z0', 't', 'k', 'W'])
    sine = t/math.sqrt(1+t*t)
    result = []
    for i in range(n):
        a = 2*math.pi*i/n
        z = centre+(hi-lo)/2*math.cos(a)
        y = math.copysign(math.sqrt(max(0, k*k/z**2-((z-z0)/t)**2)), math.sin(a))
        if i in (0, n//2):
            y = 0
        result.append(((z-centre)/sine*2/w, y*2/w))
    return result


def distances(points, poly):
    segs = [(a, (b[0]-a[0], b[1]-a[1]), (b[0]-a[0])**2+(b[1]-a[1])**2)
            for a,b in zip(poly, poly[1:]+poly[:1])]
    out = []
    for p in points:
        best = float('inf')
        for a,d,l2 in segs:
            v = (p[0]-a[0], p[1]-a[1])
            s = max(0, min(1, (v[0]*d[0]+v[1]*d[1])/l2))
            best = min(best, (v[0]-s*d[0])**2+(v[1]-s*d[1])**2)
        out.append(math.sqrt(best))
    return out


def shape_error(row, n):
    oval = contour(row, n)
    ellipse = [(float(PHI)*math.cos(2*math.pi*i/n), math.sin(2*math.pi*i/n))
               for i in range(n)]
    dist = distances(oval, ellipse)+distances(ellipse, oval)
    # Registered sampled Hausdorff; no independent axis scaling or best fit.
    return dict(samples=n, hausdorff=max(dist),
                relativeToEllipseLengthPercent=max(dist)/(2*float(PHI))*100)


def main():
    theta = atan(PHI.sqrt())*180/PI
    beta = atan(D(14)/11)*180/PI
    solved = []
    for z0 in [D(5), D('7.65'), D(10)]:
        t = bisect(lambda t: section(t,z0)['ratio']-PHI, D(1), D('1.3'))
        solved.append(section(t,z0))
    cases = {
        'lange_rounded': section(tan_deg(D('51.84'))),
        'pyramid_11_7': section(D(14)/11),
        'huntley_angle': section(PHI.sqrt()),
        'golden_fixed_height': solved[1],
    }
    for row in cases.values():
        row['proportionComparison'] = compare(PHI,row['ratio'])
        row['outline'] = [shape_error(row,n) for n in (256,512,1024)]
    golden = solved[1]
    # Uniform scaling and horizontal reflection preserve plane and surface.
    scale = D('3.5')/golden['L']
    kscaled = scale**2
    sample_z = golden['zMax']
    sample_r = 1/sample_z
    assert abs((scale*sample_z)*(scale*sample_r)-kscaled) < D('1e-55')
    x = (sample_z-golden['z0'])/golden['t']
    y = (1/sample_z**2-x*x).sqrt()
    anchor = D(7)
    X, Y, Z = scale*x, scale*y, anchor+scale*(sample_z-golden['z0'])
    Zmirror = 2*D(7)-Z
    radius = (X*X+Y*Y).sqrt()
    assert abs(Z-anchor-X*golden['t']) < D('1e-55')
    assert abs(Zmirror-(2*D(7)-anchor)+X*golden['t']) < D('1e-55')
    assert abs((2*D(7)-Zmirror-anchor+scale*golden['z0'])*radius-kscaled) < D('1e-54')
    # A local nonzero derivative supports an isolated root / continuous family.
    eps = D('.000001')
    derivative = (section(tan_deg(golden['angle']+eps))['ratio']-
                  section(tan_deg(golden['angle']-eps))['ratio'])/(2*eps)
    assert derivative > 0
    report = dict(precision=60, tolerancePercent=D('.1'), phi=PHI,
        angles=dict(theta=theta,beta=beta,betaVsTheta=compare(theta,beta),
                    alphaGoldenVsBeta=compare(beta,golden['angle'])),
        ellipse=dict(a=PHI,b=D(1),e=1/PHI.sqrt(),c=PHI.sqrt(),
                     directrix=PHI**D('1.5'),semiLatus=1/PHI),
        cases=cases, goldenFamily=solved,
        localDerivativeRatioPerDegree=derivative,
        sourceLengths=dict(L=compare(D('.423584'),cases['lange_rounded']['L']),
                           W=compare(D('.261789'),cases['lange_rounded']['W'])),
        scaleExample=dict(s=scale,kScaled=kscaled,z0Scaled=scale*D('7.65')),
        limitations=['Outline is a converged sampled polyline measure, not a certified exact Hausdorff bound.',
                      'Nonzero derivative is evaluated numerically; no global uniqueness theorem for fixed height is claimed.'])
    target = Path(__file__).with_name('wyniki.json')
    target.write_text(json.dumps(report,default=lambda x: str(x),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(target)
    print('theta',theta,'beta',beta)
    for name,row in cases.items():
        print(name,'alpha',row['angle'],'L',row['L'],'W',row['W'],'L/W',row['ratio'],
              'error %',row['proportionComparison']['relativePercent'], 'outline',row['outline'][-1])
    print('family',[(str(row['z0']),str(row['angle'])) for row in solved])


if __name__ == '__main__':
    main()

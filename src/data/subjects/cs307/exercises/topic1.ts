import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs307-t1-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Calculate Risk Score',
    difficulty: 1,
    description: 'Implement a function that calculates risk score using the formula: Risk = Likelihood × Impact. Both values range from 1-5.',
    starterCode: `def calculate_risk(likelihood, impact):
    """
    Calculate risk score from likelihood and impact values.

    Args:
        likelihood: Integer from 1-5 representing probability
        impact: Integer from 1-5 representing severity

    Returns:
        Integer risk score
    """
    pass`,
    solution: `def calculate_risk(likelihood, impact):
    """
    Calculate risk score from likelihood and impact values.

    Args:
        likelihood: Integer from 1-5 representing probability
        impact: Integer from 1-5 representing severity

    Returns:
        Integer risk score
    """
    return likelihood * impact`,
    testCases: [
      { input: '3, 4', expectedOutput: '12', isHidden: false, description: 'Medium likelihood, high impact' },
      { input: '1, 1', expectedOutput: '1', isHidden: false, description: 'Low likelihood, low impact' },
      { input: '5, 5', expectedOutput: '25', isHidden: true, description: 'Critical risk' },
      { input: '2, 3', expectedOutput: '6', isHidden: true, description: 'Low-medium risk' }
    ],
    hints: ['Risk is simply the product of likelihood and impact', 'No need to validate inputs for this exercise'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Risk Level Classification',
    difficulty: 2,
    description: 'Classify risk scores into categories: Low (1-6), Medium (7-12), High (13-20), Critical (21-25).',
    starterCode: `def classify_risk(risk_score):
    """
    Classify a risk score into a risk level category.

    Args:
        risk_score: Integer from 1-25

    Returns:
        String: 'Low', 'Medium', 'High', or 'Critical'
    """
    pass`,
    solution: `def classify_risk(risk_score):
    """
    Classify a risk score into a risk level category.

    Args:
        risk_score: Integer from 1-25

    Returns:
        String: 'Low', 'Medium', 'High', or 'Critical'
    """
    if risk_score <= 6:
        return 'Low'
    elif risk_score <= 12:
        return 'Medium'
    elif risk_score <= 20:
        return 'High'
    else:
        return 'Critical'`,
    testCases: [
      { input: '4', expectedOutput: 'Low', isHidden: false, description: 'Low risk score' },
      { input: '10', expectedOutput: 'Medium', isHidden: false, description: 'Medium risk score' },
      { input: '15', expectedOutput: 'High', isHidden: false, description: 'High risk score' },
      { input: '25', expectedOutput: 'Critical', isHidden: true, description: 'Critical risk score' },
      { input: '1', expectedOutput: 'Low', isHidden: true, description: 'Minimum risk' },
      { input: '12', expectedOutput: 'Medium', isHidden: true, description: 'Boundary case' }
    ],
    hints: ['Use conditional statements to check ranges', 'Consider boundary values carefully'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Threat Type Classifier',
    difficulty: 2,
    description: 'Classify threats by type based on keywords. Return "Physical", "Technical", "Human", or "Unknown".',
    starterCode: `def classify_threat(threat_description):
    """
    Classify a threat based on its description.

    Args:
        threat_description: String describing the threat

    Returns:
        String: threat type classification
    """
    pass`,
    solution: `def classify_threat(threat_description):
    """
    Classify a threat based on its description.

    Args:
        threat_description: String describing the threat

    Returns:
        String: threat type classification
    """
    desc_lower = threat_description.lower()

    physical_keywords = ['fire', 'flood', 'earthquake', 'theft', 'damage', 'break-in']
    technical_keywords = ['malware', 'virus', 'hack', 'exploit', 'ddos', 'vulnerability']
    human_keywords = ['phishing', 'social engineering', 'insider', 'error', 'mistake']

    for keyword in physical_keywords:
        if keyword in desc_lower:
            return 'Physical'

    for keyword in technical_keywords:
        if keyword in desc_lower:
            return 'Technical'

    for keyword in human_keywords:
        if keyword in desc_lower:
            return 'Human'

    return 'Unknown'`,
    testCases: [
      { input: '"Malware infection detected"', expectedOutput: 'Technical', isHidden: false, description: 'Technical threat' },
      { input: '"Phishing email received"', expectedOutput: 'Human', isHidden: false, description: 'Human threat' },
      { input: '"Fire in server room"', expectedOutput: 'Physical', isHidden: false, description: 'Physical threat' },
      { input: '"DDoS attack on website"', expectedOutput: 'Technical', isHidden: true, description: 'Technical attack' },
      { input: '"Random event"', expectedOutput: 'Unknown', isHidden: true, description: 'Unknown threat type' }
    ],
    hints: ['Convert to lowercase for case-insensitive matching', 'Check for keywords in the description', 'Return "Unknown" if no keywords match'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'CIA Triad Violation Detector',
    difficulty: 2,
    description: 'Determine which CIA principle is violated: Confidentiality, Integrity, or Availability.',
    starterCode: `def detect_cia_violation(incident):
    """
    Detect which CIA triad principle is violated.

    Args:
        incident: String describing the security incident

    Returns:
        String: 'Confidentiality', 'Integrity', or 'Availability'
    """
    pass`,
    solution: `def detect_cia_violation(incident):
    """
    Detect which CIA triad principle is violated.

    Args:
        incident: String describing the security incident

    Returns:
        String: 'Confidentiality', 'Integrity', or 'Availability'
    """
    incident_lower = incident.lower()

    if any(word in incident_lower for word in ['leak', 'disclosure', 'unauthorized access', 'exposed', 'stolen data']):
        return 'Confidentiality'
    elif any(word in incident_lower for word in ['modified', 'altered', 'tampered', 'corrupted', 'changed']):
        return 'Integrity'
    elif any(word in incident_lower for word in ['unavailable', 'down', 'offline', 'denial', 'outage']):
        return 'Availability'

    return 'Confidentiality'`,
    testCases: [
      { input: '"Data leak exposed customer records"', expectedOutput: 'Confidentiality', isHidden: false, description: 'Data breach' },
      { input: '"Database records were modified"', expectedOutput: 'Integrity', isHidden: false, description: 'Data modification' },
      { input: '"Service is down and unavailable"', expectedOutput: 'Availability', isHidden: false, description: 'Service outage' },
      { input: '"Unauthorized access to files"', expectedOutput: 'Confidentiality', isHidden: true, description: 'Access violation' },
      { input: '"Data corrupted by attacker"', expectedOutput: 'Integrity', isHidden: true, description: 'Data corruption' }
    ],
    hints: ['Look for keywords related to each CIA principle', 'Confidentiality: unauthorized access, leaks', 'Integrity: modifications, tampering', 'Availability: downtime, service disruptions'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Security Control Type Identifier',
    difficulty: 3,
    description: 'Identify if a security control is Preventive, Detective, or Corrective based on its description.',
    starterCode: `def identify_control_type(control):
    """
    Identify the type of security control.

    Args:
        control: String describing the security control

    Returns:
        String: 'Preventive', 'Detective', or 'Corrective'
    """
    pass`,
    solution: `def identify_control_type(control):
    """
    Identify the type of security control.

    Args:
        control: String describing the security control

    Returns:
        String: 'Preventive', 'Detective', or 'Corrective'
    """
    control_lower = control.lower()

    preventive_keywords = ['firewall', 'encryption', 'access control', 'authentication', 'prevent', 'block']
    detective_keywords = ['monitor', 'log', 'alert', 'detect', 'audit', 'scan', 'ids']
    corrective_keywords = ['backup', 'restore', 'patch', 'fix', 'recovery', 'remediate']

    for keyword in preventive_keywords:
        if keyword in control_lower:
            return 'Preventive'

    for keyword in detective_keywords:
        if keyword in control_lower:
            return 'Detective'

    for keyword in corrective_keywords:
        if keyword in control_lower:
            return 'Corrective'

    return 'Preventive'`,
    testCases: [
      { input: '"Firewall blocks unauthorized traffic"', expectedOutput: 'Preventive', isHidden: false, description: 'Preventive control' },
      { input: '"IDS monitors network activity"', expectedOutput: 'Detective', isHidden: false, description: 'Detective control' },
      { input: '"Backup system for recovery"', expectedOutput: 'Corrective', isHidden: false, description: 'Corrective control' },
      { input: '"Encryption protects data"', expectedOutput: 'Preventive', isHidden: true, description: 'Data protection' },
      { input: '"Audit logs track access"', expectedOutput: 'Detective', isHidden: true, description: 'Logging mechanism' }
    ],
    hints: ['Preventive controls stop incidents before they occur', 'Detective controls identify incidents during or after', 'Corrective controls restore systems after incidents'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Defense in Depth Layer Counter',
    difficulty: 3,
    description: 'Count how many layers of defense are mentioned in a security architecture description.',
    starterCode: `def count_defense_layers(architecture):
    """
    Count the number of defense layers in an architecture.

    Args:
        architecture: String describing security architecture

    Returns:
        Integer: number of defense layers identified
    """
    pass`,
    solution: `def count_defense_layers(architecture):
    """
    Count the number of defense layers in an architecture.

    Args:
        architecture: String describing security architecture

    Returns:
        Integer: number of defense layers identified
    """
    arch_lower = architecture.lower()

    layers = [
        'firewall',
        'ids',
        'ips',
        'encryption',
        'authentication',
        'access control',
        'antivirus',
        'waf',
        'dmz',
        'vpn'
    ]

    count = 0
    for layer in layers:
        if layer in arch_lower:
            count += 1

    return count`,
    testCases: [
      { input: '"System uses firewall and encryption"', expectedOutput: '2', isHidden: false, description: 'Two layers' },
      { input: '"Firewall, IDS, and authentication in place"', expectedOutput: '3', isHidden: false, description: 'Three layers' },
      { input: '"Basic setup with no special controls"', expectedOutput: '0', isHidden: false, description: 'No layers' },
      { input: '"DMZ with firewall, IDS, IPS, and WAF protection"', expectedOutput: '5', isHidden: true, description: 'Five layers' },
      { input: '"VPN access with authentication and encryption"', expectedOutput: '3', isHidden: true, description: 'Three layers' }
    ],
    hints: ['Define common defense layer keywords', 'Count how many appear in the description', 'Each layer should only be counted once'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Least Privilege Validator',
    difficulty: 3,
    description: 'Check if user permissions follow the principle of least privilege by comparing required vs granted permissions.',
    starterCode: `def validate_least_privilege(required_perms, granted_perms):
    """
    Validate if granted permissions follow least privilege principle.

    Args:
        required_perms: List of required permissions
        granted_perms: List of granted permissions

    Returns:
        Boolean: True if least privilege followed, False otherwise
    """
    pass`,
    solution: `def validate_least_privilege(required_perms, granted_perms):
    """
    Validate if granted permissions follow least privilege principle.

    Args:
        required_perms: List of required permissions
        granted_perms: List of granted permissions

    Returns:
        Boolean: True if least privilege followed, False otherwise
    """
    required_set = set(required_perms)
    granted_set = set(granted_perms)

    # Least privilege means granted should equal required (no excess)
    return granted_set == required_set`,
    testCases: [
      { input: "['read', 'write'], ['read', 'write']", expectedOutput: 'True', isHidden: false, description: 'Exact match' },
      { input: "['read'], ['read', 'write', 'delete']", expectedOutput: 'False', isHidden: false, description: 'Excessive permissions' },
      { input: "['read', 'write'], ['read']", expectedOutput: 'False', isHidden: false, description: 'Insufficient permissions' },
      { input: "[], []", expectedOutput: 'True', isHidden: true, description: 'No permissions needed or granted' },
      { input: "['admin', 'read'], ['admin', 'read']", expectedOutput: 'True', isHidden: true, description: 'Multiple permissions exact match' }
    ],
    hints: ['Convert lists to sets for comparison', 'Least privilege means no excess permissions', 'Granted should exactly match required'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Asset Value Calculator',
    difficulty: 3,
    description: 'Calculate total asset value from a list of assets with their individual values.',
    starterCode: `def calculate_asset_value(assets):
    """
    Calculate total value of all assets.

    Args:
        assets: Dictionary with asset names as keys and values as integers

    Returns:
        Integer: total asset value
    """
    pass`,
    solution: `def calculate_asset_value(assets):
    """
    Calculate total value of all assets.

    Args:
        assets: Dictionary with asset names as keys and values as integers

    Returns:
        Integer: total asset value
    """
    return sum(assets.values())`,
    testCases: [
      { input: "{'server': 10000, 'database': 50000}", expectedOutput: '60000', isHidden: false, description: 'Two assets' },
      { input: "{'laptop': 1000, 'phone': 500, 'tablet': 300}", expectedOutput: '1800', isHidden: false, description: 'Three assets' },
      { input: "{}", expectedOutput: '0', isHidden: true, description: 'No assets' },
      { input: "{'critical_data': 100000}", expectedOutput: '100000', isHidden: true, description: 'Single asset' }
    ],
    hints: ['Use the sum() function on dictionary values', 'Handle empty dictionaries correctly'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Annual Loss Expectancy Calculator',
    difficulty: 4,
    description: 'Calculate ALE (Annual Loss Expectancy) using formula: ALE = SLE × ARO, where SLE is Single Loss Expectancy and ARO is Annual Rate of Occurrence.',
    starterCode: `def calculate_ale(sle, aro):
    """
    Calculate Annual Loss Expectancy.

    Args:
        sle: Single Loss Expectancy (dollar amount)
        aro: Annual Rate of Occurrence (times per year)

    Returns:
        Float: Annual Loss Expectancy
    """
    pass`,
    solution: `def calculate_ale(sle, aro):
    """
    Calculate Annual Loss Expectancy.

    Args:
        sle: Single Loss Expectancy (dollar amount)
        aro: Annual Rate of Occurrence (times per year)

    Returns:
        Float: Annual Loss Expectancy
    """
    return sle * aro`,
    testCases: [
      { input: '10000, 0.5', expectedOutput: '5000.0', isHidden: false, description: 'Loss every 2 years' },
      { input: '50000, 0.1', expectedOutput: '5000.0', isHidden: false, description: 'Loss every 10 years' },
      { input: '1000, 2', expectedOutput: '2000.0', isHidden: true, description: 'Loss twice per year' },
      { input: '25000, 0.25', expectedOutput: '6250.0', isHidden: true, description: 'Loss every 4 years' }
    ],
    hints: ['ALE is simply SLE multiplied by ARO', 'ARO can be a decimal (e.g., 0.5 means once every 2 years)'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Risk Mitigation Cost-Benefit Analysis',
    difficulty: 4,
    description: 'Determine if a security control is cost-effective by comparing ALE reduction to control cost.',
    starterCode: `def is_cost_effective(ale_before, ale_after, control_cost):
    """
    Determine if a security control is cost-effective.

    Args:
        ale_before: ALE before implementing control
        ale_after: ALE after implementing control
        control_cost: Annual cost of the control

    Returns:
        Boolean: True if cost-effective, False otherwise
    """
    pass`,
    solution: `def is_cost_effective(ale_before, ale_after, control_cost):
    """
    Determine if a security control is cost-effective.

    Args:
        ale_before: ALE before implementing control
        ale_after: ALE after implementing control
        control_cost: Annual cost of the control

    Returns:
        Boolean: True if cost-effective, False otherwise
    """
    ale_reduction = ale_before - ale_after
    return ale_reduction > control_cost`,
    testCases: [
      { input: '10000, 2000, 5000', expectedOutput: 'True', isHidden: false, description: 'Saves $8000, costs $5000' },
      { input: '10000, 8000, 5000', expectedOutput: 'False', isHidden: false, description: 'Saves $2000, costs $5000' },
      { input: '50000, 10000, 30000', expectedOutput: 'True', isHidden: true, description: 'Large reduction' },
      { input: '5000, 4000, 1000', expectedOutput: 'False', isHidden: true, description: 'Break-even scenario' }
    ],
    hints: ['Calculate ALE reduction (before - after)', 'Control is cost-effective if reduction exceeds cost', 'Compare savings to cost'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Threat Actor Classification',
    difficulty: 4,
    description: 'Classify threat actors into categories: Script Kiddie, Hacktivist, Organized Crime, Nation State, or Insider.',
    starterCode: `def classify_threat_actor(description):
    """
    Classify a threat actor based on characteristics.

    Args:
        description: String describing the threat actor

    Returns:
        String: threat actor classification
    """
    pass`,
    solution: `def classify_threat_actor(description):
    """
    Classify a threat actor based on characteristics.

    Args:
        description: String describing the threat actor

    Returns:
        String: threat actor classification
    """
    desc_lower = description.lower()

    if any(word in desc_lower for word in ['employee', 'insider', 'staff', 'worker']):
        return 'Insider'
    elif any(word in desc_lower for word in ['nation', 'state-sponsored', 'government', 'apt']):
        return 'Nation State'
    elif any(word in desc_lower for word in ['organized', 'criminal', 'profit', 'ransomware']):
        return 'Organized Crime'
    elif any(word in desc_lower for word in ['activist', 'political', 'ideology', 'protest']):
        return 'Hacktivist'
    elif any(word in desc_lower for word in ['amateur', 'unskilled', 'script', 'kiddie', 'tools']):
        return 'Script Kiddie'

    return 'Unknown'`,
    testCases: [
      { input: '"Unskilled attacker using automated tools"', expectedOutput: 'Script Kiddie', isHidden: false, description: 'Amateur attacker' },
      { input: '"State-sponsored APT group"', expectedOutput: 'Nation State', isHidden: false, description: 'Nation state actor' },
      { input: '"Disgruntled employee with access"', expectedOutput: 'Insider', isHidden: false, description: 'Insider threat' },
      { input: '"Organized criminal group deploying ransomware"', expectedOutput: 'Organized Crime', isHidden: true, description: 'Cybercrime' },
      { input: '"Activist group protesting political issues"', expectedOutput: 'Hacktivist', isHidden: true, description: 'Hacktivist' }
    ],
    hints: ['Look for keywords specific to each threat actor type', 'Consider motivation and sophistication level', 'Insiders have legitimate access', 'Nation states are highly sophisticated'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Security Policy Compliance Checker',
    difficulty: 4,
    description: 'Check if a system configuration complies with security policy requirements.',
    starterCode: `def check_policy_compliance(config, policy):
    """
    Check if configuration meets policy requirements.

    Args:
        config: Dictionary of current configuration settings
        policy: Dictionary of required policy settings

    Returns:
        Boolean: True if compliant, False otherwise
    """
    pass`,
    solution: `def check_policy_compliance(config, policy):
    """
    Check if configuration meets policy requirements.

    Args:
        config: Dictionary of current configuration settings
        policy: Dictionary of required policy settings

    Returns:
        Boolean: True if compliant, False otherwise
    """
    for key, required_value in policy.items():
        if key not in config:
            return False
        if config[key] != required_value:
            return False
    return True`,
    testCases: [
      { input: "{'encryption': True, 'mfa': True}, {'encryption': True, 'mfa': True}", expectedOutput: 'True', isHidden: false, description: 'Fully compliant' },
      { input: "{'encryption': True}, {'encryption': True, 'mfa': True}", expectedOutput: 'False', isHidden: false, description: 'Missing requirement' },
      { input: "{'encryption': False, 'mfa': True}, {'encryption': True, 'mfa': True}", expectedOutput: 'False', isHidden: false, description: 'Wrong value' },
      { input: "{'encryption': True, 'mfa': True, 'logging': True}, {'encryption': True}", expectedOutput: 'True', isHidden: true, description: 'Extra settings allowed' }
    ],
    hints: ['Check if all policy keys exist in config', 'Verify values match exactly', 'Config can have extra settings not in policy'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Vulnerability Severity Calculator',
    difficulty: 5,
    description: 'Calculate CVSS-style severity score (0-10) based on exploitability, impact, and complexity factors.',
    starterCode: `def calculate_severity(exploitability, impact, complexity):
    """
    Calculate vulnerability severity score.

    Args:
        exploitability: Float 0-1 (how easy to exploit)
        impact: Float 0-1 (damage potential)
        complexity: Float 0-1 (attack complexity, inverted)

    Returns:
        Float: severity score 0-10, rounded to 1 decimal
    """
    pass`,
    solution: `def calculate_severity(exploitability, impact, complexity):
    """
    Calculate vulnerability severity score.

    Args:
        exploitability: Float 0-1 (how easy to exploit)
        impact: Float 0-1 (damage potential)
        complexity: Float 0-1 (attack complexity, inverted)

    Returns:
        Float: severity score 0-10, rounded to 1 decimal
    """
    # Simplified CVSS-like calculation
    base_score = (exploitability * 0.3 + impact * 0.5 + complexity * 0.2) * 10
    return round(base_score, 1)`,
    testCases: [
      { input: '0.9, 1.0, 0.8', expectedOutput: '9.5', isHidden: false, description: 'Critical vulnerability' },
      { input: '0.5, 0.5, 0.5', expectedOutput: '5.0', isHidden: false, description: 'Medium severity' },
      { input: '0.2, 0.3, 0.1', expectedOutput: '2.3', isHidden: false, description: 'Low severity' },
      { input: '1.0, 1.0, 1.0', expectedOutput: '10.0', isHidden: true, description: 'Maximum severity' },
      { input: '0.0, 0.0, 0.0', expectedOutput: '0.0', isHidden: true, description: 'Minimum severity' }
    ],
    hints: ['Weight impact most heavily (50%)', 'Exploitability counts for 30%', 'Complexity counts for 20%', 'Multiply sum by 10 to get 0-10 scale', 'Round to 1 decimal place'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Multi-Factor Risk Assessment',
    difficulty: 5,
    description: 'Assess risk considering multiple factors: asset value, threat level, vulnerability, and existing controls.',
    starterCode: `def assess_risk(asset_value, threat_level, vulnerability, controls_effectiveness):
    """
    Perform comprehensive risk assessment.

    Args:
        asset_value: Integer 1-10
        threat_level: Integer 1-10
        vulnerability: Integer 1-10
        controls_effectiveness: Float 0-1 (0=no controls, 1=perfect)

    Returns:
        Dictionary with 'score' (float) and 'level' (string)
    """
    pass`,
    solution: `def assess_risk(asset_value, threat_level, vulnerability, controls_effectiveness):
    """
    Perform comprehensive risk assessment.

    Args:
        asset_value: Integer 1-10
        threat_level: Integer 1-10
        vulnerability: Integer 1-10
        controls_effectiveness: Float 0-1 (0=no controls, 1=perfect)

    Returns:
        Dictionary with 'score' (float) and 'level' (string)
    """
    # Calculate base risk
    base_risk = (asset_value * threat_level * vulnerability) / 100

    # Apply controls reduction
    residual_risk = base_risk * (1 - controls_effectiveness)

    # Determine risk level
    if residual_risk < 2:
        level = 'Low'
    elif residual_risk < 5:
        level = 'Medium'
    elif residual_risk < 8:
        level = 'High'
    else:
        level = 'Critical'

    return {
        'score': round(residual_risk, 2),
        'level': level
    }`,
    testCases: [
      { input: "10, 10, 10, 0.5", expectedOutput: "{'score': 5.0, 'level': 'Medium'}", isHidden: false, description: 'High base risk, good controls' },
      { input: "5, 5, 5, 0.0", expectedOutput: "{'score': 1.25, 'level': 'Low'}", isHidden: false, description: 'Medium base risk, no controls' },
      { input: "10, 10, 10, 0.0", expectedOutput: "{'score': 10.0, 'level': 'Critical'}", isHidden: true, description: 'Maximum risk, no controls' },
      { input: "8, 9, 7, 0.8", expectedOutput: "{'score': 1.01, 'level': 'Low'}", isHidden: true, description: 'High base risk, excellent controls' }
    ],
    hints: ['Calculate base risk from asset value, threat, and vulnerability', 'Reduce risk based on controls effectiveness', 'Controls effectiveness of 1.0 means perfect mitigation', 'Classify final residual risk into levels'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Security Incident Prioritizer',
    difficulty: 5,
    description: 'Prioritize security incidents based on severity, affected systems, and business impact.',
    starterCode: `def prioritize_incident(severity, affected_systems, business_impact):
    """
    Calculate incident priority score.

    Args:
        severity: Integer 1-5 (technical severity)
        affected_systems: Integer (number of affected systems)
        business_impact: Integer 1-5 (business impact level)

    Returns:
        Dictionary with 'priority_score' and 'priority_level'
    """
    pass`,
    solution: `def prioritize_incident(severity, affected_systems, business_impact):
    """
    Calculate incident priority score.

    Args:
        severity: Integer 1-5 (technical severity)
        affected_systems: Integer (number of affected systems)
        business_impact: Integer 1-5 (business impact level)

    Returns:
        Dictionary with 'priority_score' and 'priority_level'
    """
    # Weight factors
    severity_weight = 0.4
    systems_weight = 0.2
    impact_weight = 0.4

    # Normalize affected systems (cap at 10 for scoring)
    normalized_systems = min(affected_systems, 10) / 2

    # Calculate weighted score
    priority_score = (
        severity * severity_weight +
        normalized_systems * systems_weight +
        business_impact * impact_weight
    )

    # Determine priority level
    if priority_score >= 4.5:
        priority_level = 'P1-Critical'
    elif priority_score >= 3.5:
        priority_level = 'P2-High'
    elif priority_score >= 2.5:
        priority_level = 'P3-Medium'
    else:
        priority_level = 'P4-Low'

    return {
        'priority_score': round(priority_score, 2),
        'priority_level': priority_level
    }`,
    testCases: [
      { input: "5, 10, 5", expectedOutput: "{'priority_score': 5.0, 'priority_level': 'P1-Critical'}", isHidden: false, description: 'Critical incident' },
      { input: "3, 2, 3", expectedOutput: "{'priority_score': 2.6, 'priority_level': 'P3-Medium'}", isHidden: false, description: 'Medium incident' },
      { input: "1, 1, 1", expectedOutput: "{'priority_score': 0.9, 'priority_level': 'P4-Low'}", isHidden: false, description: 'Low priority' },
      { input: "4, 5, 5", expectedOutput: "{'priority_score': 4.1, 'priority_level': 'P2-High'}", isHidden: true, description: 'High priority' }
    ],
    hints: ['Weight severity and business impact equally (40% each)', 'Affected systems should contribute 20%', 'Normalize system count to prevent skewing', 'Define clear priority thresholds'],
    language: 'python'
  },
  {
    id: 'cs307-t1-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-1',
    title: 'Security Maturity Level Assessor',
    difficulty: 5,
    description: 'Assess organization security maturity level (1-5) based on multiple capability scores.',
    starterCode: `def assess_security_maturity(capabilities):
    """
    Assess overall security maturity level.

    Args:
        capabilities: Dictionary with capability names and scores (1-5)
                     e.g., {'policy': 3, 'training': 2, 'incident_response': 4}

    Returns:
        Dictionary with 'maturity_level' (int) and 'maturity_name' (string)
    """
    pass`,
    solution: `def assess_security_maturity(capabilities):
    """
    Assess overall security maturity level.

    Args:
        capabilities: Dictionary with capability names and scores (1-5)
                     e.g., {'policy': 3, 'training': 2, 'incident_response': 4}

    Returns:
        Dictionary with 'maturity_level' (int) and 'maturity_name' (string)
    """
    if not capabilities:
        return {'maturity_level': 1, 'maturity_name': 'Initial'}

    # Calculate average capability score
    avg_score = sum(capabilities.values()) / len(capabilities)

    # Determine maturity level (round to nearest integer)
    maturity_level = round(avg_score)

    # Ensure level is in valid range
    maturity_level = max(1, min(5, maturity_level))

    # Map to maturity model names
    maturity_names = {
        1: 'Initial',
        2: 'Developing',
        3: 'Defined',
        4: 'Managed',
        5: 'Optimized'
    }

    return {
        'maturity_level': maturity_level,
        'maturity_name': maturity_names[maturity_level]
    }`,
    testCases: [
      { input: "{'policy': 3, 'training': 3, 'incident_response': 3}", expectedOutput: "{'maturity_level': 3, 'maturity_name': 'Defined'}", isHidden: false, description: 'Consistent level 3' },
      { input: "{'policy': 5, 'training': 5, 'technical': 5}", expectedOutput: "{'maturity_level': 5, 'maturity_name': 'Optimized'}", isHidden: false, description: 'Optimized organization' },
      { input: "{'policy': 1, 'training': 2, 'incident_response': 1}", expectedOutput: "{'maturity_level': 1, 'maturity_name': 'Initial'}", isHidden: true, description: 'Low maturity' },
      { input: "{'policy': 4, 'training': 3, 'incident_response': 5, 'monitoring': 4}", expectedOutput: "{'maturity_level': 4, 'maturity_name': 'Managed'}", isHidden: true, description: 'Mixed high scores' }
    ],
    hints: ['Calculate average of all capability scores', 'Round to nearest integer for maturity level', 'Map levels: 1=Initial, 2=Developing, 3=Defined, 4=Managed, 5=Optimized', 'Handle empty capabilities dictionary'],
    language: 'python'
  }
];

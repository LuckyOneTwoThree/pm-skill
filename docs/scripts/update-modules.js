const fs = require('fs');
const path = require('path');

// Module configuration
const modules = {
  'discovery': {
    name: '产品探索与发现',
    icon: '🔍',
    desc: '从0开始，探索用户需求、市场机会，通过用户研究、需求洞察、市场竞品、机会识别四个维度全面理解问题空间',
    color: '#00d4ff',
    submoduleOrder: ['用户研究', '需求洞察', '市场竞品', '机会识别'],
    pipelineOrder: [
      // 用户研究 (4个)
      'user-research-voice-analysis',
      'user-research-behavior-analysis',
      'user-research-user-modeling',
      'user-research-interview-assist',
      // 需求洞察 (5个)
      'insight-jtbd',
      'insight-5whys',
      'insight-requirement-layers',
      'insight-kano',
      'insight-priority-scoring',
      // 市场竞品 (4个)
      'market-tam-som',
      'market-pest',
      'market-competitor-intel',
      'market-competitor-quadrant',
      // 机会识别 (4个)
      'opportunity-scoring',
      'opportunity-hmw',
      'opportunity-problem-statement',
      'opportunity-brief'
    ]
  },
  'strategy': {
    name: '产品商业与战略',
    icon: '🎯',
    desc: '确定商业模式、定位和战略方向，包括商业画布、价值主张、定价策略、竞争分析等关键决策',
    color: '#b829dd',
    submoduleOrder: ['商业模型', '战略规划', '定位策略', '干系人管理'],
    pipelineOrder: [
      // 商业模式设计 (3个)
      'business-model-canvas',
      'business-value-fit',
      'business-pricing',
      // 产品定位与差异化 (4个)
      'positioning-statement',
      'positioning-value-curve',
      'positioning-differentiation',
      'positioning-exclusion',
      // 战略规划与路线图 (6个)
      'planning-swot',
      'planning-porter-five-forces',
      'planning-okr',
      'planning-north-star',
      'planning-roadmap',
      'planning-ansoff',
      // Stakeholder对齐 (3个)
      'stakeholder-map',
      'stakeholder-strategy-doc',
      'stakeholder-brief'
    ]
  },
  'design': {
    name: '产品构思与设计',
    icon: '✨',
    desc: '设计方案、验证假设、构建原型，覆盖需求理解、创意发散、方案设计、可用性验证全流程',
    color: '#ff006e',
    submoduleOrder: ['需求理解', '创意发散', '方案设计', '假设验证'],
    pipelineOrder: [
      // 需求管理 (3个)
      'requirements-collection',
      'requirements-understanding',
      'requirements-prioritization',
      // 创意发散与方案构思 (4个)
      'ideation-hmw',
      'ideation-scamper',
      'ideation-inversion',
      'ideation-convergence',
      // 产品设计与原型 (3个)
      'design-ia',
      'design-userflow',
      'design-prototype',
      // 方案验证 (4个)
      'validation-assumption-map',
      'validation-mvp',
      'validation-experiment',
      'validation-usability'
    ]
  },
  'prd': {
    name: 'PRD 自动生成',
    icon: '📝',
    desc: '基于设计方案自动生成完整的产品需求文档，包含功能描述、用户故事、验收标准',
    color: '#00ff88',
    submoduleOrder: ['PRD生成'],
    pipelineOrder: [
      'prd-generation'
    ]
  },
  'metrics-design': {
    name: '产品度量设计',
    icon: '📊',
    desc: '开发前设计指标体系和埋点方案，确保产品上线后能够有效衡量用户行为和产品表现',
    color: '#ffd700',
    submoduleOrder: ['指标体系', '埋点设计', '数据看板'],
    pipelineOrder: [
      // 指标体系
      'metrics-system',
      // 埋点设计
      'tracking-plan',
      // 数据看板
      'metrics-dashboard'
    ]
  },
  'development': {
    name: '产品开发与上线',
    icon: '🚀',
    desc: '开发交付、质量保证、发布上线，覆盖任务拆解、开发协同、质量检查、发布管理全流程',
    color: '#00f5ff',
    submoduleOrder: ['开发管理', '质量保证', '发布上线', '迭代回顾'],
    pipelineOrder: [
      // 开发协作 (3个)
      'development-task-breakdown',
      'development-auto-review',
      'development-prd-sync',
      // 质量保障 (2个)
      'quality-auto-test',
      'quality-auto-acceptance',
      // 发布策略 (2个)
      'release-gradual',
      'release-auto-checklist',
      // 上线复盘 (1个)
      'retrospective-auto'
    ]
  },
  'metrics-ops': {
    name: '产品度量运营',
    icon: '📈',
    desc: '上线后数据分析和实验验证，通过漏斗分析、留存分析、异常检测等手段持续优化产品',
    color: '#ff6b6b',
    submoduleOrder: ['数据分析', '实验设计', '决策支持'],
    pipelineOrder: [
      // 数据分析 (3个)
      'analysis-anomaly',
      'analysis-funnel',
      'analysis-retention',
      // 实验验证 (2个)
      'experiment-design',
      'experiment-execution',
      // 数据驱动决策 (3个)
      'decision-insight',
      'decision-dace',
      'decision-culture'
    ]
  },
  'growth': {
    name: '产品增长与运营',
    icon: '📣',
    desc: '获取用户、提升留存、商业化，覆盖获客渠道、激活引导、留存策略、收入增长全链路',
    color: '#4ecdc4',
    submoduleOrder: ['获客', '激活', '留存', '收入'],
    pipelineOrder: [
      // 获客 (2个)
      'acquisition-channel',
      'acquisition-optimize',
      // 激活 (2个)
      'activation-aha',
      'activation-onboarding',
      // 留存 (2个)
      'retention-engagement',
      'retention-churn',
      // 收入 (3个)
      'revenue-funnel',
      'revenue-upsell',
      'revenue-nrr',
      // 增长模型
      'growth-model'
    ]
  },
  'monitoring': {
    name: '产品监控与迭代',
    icon: '🔧',
    desc: '监控预警、问题诊断、迭代优化，建立完整的产品健康度监控体系和持续迭代机制',
    color: '#a8e6cf',
    submoduleOrder: ['监控预警', '问题诊断', '迭代优化'],
    pipelineOrder: [
      // 监控预警 (3个)
      'monitoring-system',
      'monitoring-dashboard',
      'monitoring-anomaly',
      'monitoring-escalation',
      // 问题诊断 (2个)
      'diagnosis-health',
      'diagnosis-competition',
      // 迭代优化 (3个)
      'iteration-backlog',
      'iteration-prioritization',
      'iteration-retrospective'
    ]
  },
  'project': {
    name: '项目管理与执行',
    icon: '📋',
    desc: '贯穿全程的项目管理，包括项目规划、敏捷执行、风险控制、干系人管理',
    color: '#ffd93d',
    submoduleOrder: ['项目规划', '敏捷执行', '风险管理'],
    pipelineOrder: [
      // 项目规划 (3个)
      'planning-project-charter',
      'planning-kickoff',
      'planning-resource',
      // 敏捷执行 (3个)
      'agile-sprint-planning',
      'agile-daily-sync',
      'agile-review',
      // 风险管理 (3个)
      'risk-identification',
      'risk-monitoring',
      'risk-escalation'
    ]
  },
  'guide': {
    name: '使用指南',
    icon: '📖',
    desc: 'PM Skill Galaxy 使用指南，包含快速开始、编排器使用、Pipeline Skill 调用等文档',
    color: '#9b59b6',
    submoduleOrder: ['快速开始', '编排器', 'Pipeline'],
    pipelineOrder: []
  }
};

// Submodule mapping for categorization
const submoduleMapping = {
  // discovery
  'user-research': '用户研究',
  'insight': '需求洞察',
  'market': '市场竞品',
  'opportunity': '机会识别',
  // strategy
  'business': '商业模型',
  'planning': '战略规划',
  'positioning': '定位策略',
  'stakeholder': '干系人管理',
  // design
  'requirements': '需求理解',
  'ideation': '创意发散',
  'design': '方案设计',
  'validation': '假设验证',
  // prd
  'prd': 'PRD生成',
  // metrics-design
  'metrics': '指标体系',
  'tracking': '埋点设计',
  // development
  'development': '开发管理',
  'quality': '质量保证',
  'release': '发布上线',
  'retrospective': '迭代回顾',
  // metrics-ops
  'analysis': '数据分析',
  'experiment': '实验设计',
  'decision': '决策支持',
  // growth
  'acquisition': '获客',
  'activation': '激活',
  'retention': '留存',
  'revenue': '收入',
  'growth': '获客',
  // monitoring
  'monitoring': '监控预警',
  'diagnosis': '问题诊断',
  'iteration': '迭代优化',
  // project
  'planning': '项目规划',
  'agile': '敏捷执行',
  'risk': '风险管理',
  // guide
  'guide': '快速开始',
  'orchestrator': '编排器',
  'pipeline': 'Pipeline'
};

function getSubmodule(skillName) {
  // Try to match multi-word prefixes first
  const prefixes = Object.keys(submoduleMapping).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (skillName.startsWith(prefix + '-')) {
      return submoduleMapping[prefix];
    }
  }
  // Fallback to first segment
  const prefix = skillName.split('-')[0];
  return submoduleMapping[prefix] || '其他';
}

function parseSkillMd(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let name = '';
    let desc = '';
    let version = 'v1.0';
    let keywords = '';
    let pipelineId = null;
    let inFrontmatter = false;
    let frontmatterEnded = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Parse YAML frontmatter
      if (line.trim() === '---') {
        if (!inFrontmatter && !frontmatterEnded) {
          inFrontmatter = true;
          continue;
        } else if (inFrontmatter) {
          inFrontmatter = false;
          frontmatterEnded = true;
          continue;
        }
      }
      
      if (inFrontmatter) {
        // Extract description from frontmatter
        if (line.startsWith('description:')) {
          desc = line.replace('description:', '').trim();
        }
        // Extract version from frontmatter
        if (line.trim().startsWith('version:')) {
          const match = line.match(/["']?(\d+\.\d+)["']?/);
          if (match) version = 'v' + match[1];
        }
      }
      
      // Extract Pipeline ID from markdown content (e.g., "# Pipeline 15: 可用性测试辅助")
      if (!pipelineId) {
        const pipelineMatch = line.match(/#\s*Pipeline\s+(\d+[a-z]?)[:：\s]/i);
        if (pipelineMatch) {
          pipelineId = pipelineMatch[1];
        }
      }
      
      // Also check for markdown sections as fallback
      if (line.startsWith('## Skill')) {
        const match = line.match(/## Skill\s*[:：]\s*(.+)/);
        if (match) name = match[1].trim();
      }
      if ((line.startsWith('## 作用') || line.startsWith('## Purpose')) && !desc) {
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (nextLine && !nextLine.startsWith('##')) {
            desc = nextLine;
          }
        }
      }
      if (line.startsWith('## 关键词') || line.startsWith('## Keywords')) {
        if (i + 1 < lines.length) {
          keywords = lines[i + 1].trim();
        }
      }
    }
    
    return { name, desc, version, keywords, pipelineId };
  } catch (e) {
    return null;
  }
}

function generateModulePage(moduleKey, moduleConfig) {
  // Handle special cases for directory naming
  const dirMap = {
    'discovery': 'pm-01-discovery',
    'strategy': 'pm-02-strategy',
    'design': 'pm-03-design',
    'prd': 'pm-04-prd',
    'metrics-design': 'pm-05-metrics-design',
    'development': 'pm-06-development',
    'metrics-ops': 'pm-07-metrics-ops',
    'growth': 'pm-08-growth',
    'monitoring': 'pm-09-monitoring',
    'project': 'pm-10-project',
    'guide': 'pm-00-guide'
  };
  
  const actualDir = path.join(__dirname, '..', '..', dirMap[moduleKey] || `pm-01-${moduleKey}`);
  
  // Read orchestrators
  const orchestrators = [];
  const orchDir = path.join(actualDir, 'orchestrators');
  if (fs.existsSync(orchDir)) {
    const orchFolders = fs.readdirSync(orchDir).filter(f => fs.statSync(path.join(orchDir, f)).isDirectory());
    for (const folder of orchFolders) {
      const skillMd = path.join(orchDir, folder, 'SKILL.md');
      const info = parseSkillMd(skillMd);
      if (info) {
        orchestrators.push({
          ...info,
          id: folder,
          submodule: getSubmodule(folder)
        });
      }
    }
  }
  
  // Read pipeline skills
  const pipelines = [];
  const skillsDir = path.join(actualDir, 'skills');
  if (fs.existsSync(skillsDir)) {
    const skillFolders = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());
    for (const folder of skillFolders) {
      const skillMd = path.join(skillsDir, folder, 'SKILL.md');
      const info = parseSkillMd(skillMd);
      if (info) {
        pipelines.push({
          ...info,
          id: folder,
          submodule: getSubmodule(folder)
        });
      }
    }
  }
  
  // Sort orchestrators by submodule order, then by id
  const submoduleOrder = moduleConfig.submoduleOrder;
  const sortBySubmodule = (a, b) => {
    const idxA = submoduleOrder.indexOf(a.submodule);
    const idxB = submoduleOrder.indexOf(b.submodule);
    if (idxA !== idxB) return idxA - idxB;
    return a.id.localeCompare(b.id);
  };
  
  orchestrators.sort(sortBySubmodule);
  
  // Sort pipelines by Pipeline ID extracted from SKILL.md
  const parsePipelineId = (id) => {
    // Handle formats like "9", "9b", "10"
    const match = id.match(/^(\d+)([a-z]?)$/);
    if (match) {
      return { num: parseInt(match[1]), suffix: match[2] || '' };
    }
    return { num: 999, suffix: '' };
  };
  
  const sortByPipelineId = (a, b) => {
    const idA = parsePipelineId(a.pipelineId || '999');
    const idB = parsePipelineId(b.pipelineId || '999');
    if (idA.num !== idB.num) return idA.num - idB.num;
    return idA.suffix.localeCompare(idB.suffix);
  };
  
  pipelines.sort(sortByPipelineId);
  
  // Generate HTML cards
  const totalSkills = orchestrators.length + pipelines.length;
  
  const orchestratorCards = orchestrators.map(orch => `
            <div class="skill-card orchestrator">
              <div class="skill-header">
                <span class="skill-type">编排器</span>
                <span class="skill-version">${orch.version}</span>
              </div>
              <h3 class="skill-name">${orch.id}</h3>
              <p class="skill-desc">${orch.desc}</p>
              <span class="skill-submodule">${orch.submodule}</span>
            </div>
  `).join('\n');
  
  const pipelineCards = pipelines.map(pipe => `
            <div class="skill-card pipeline">
              <div class="skill-header">
                <span class="skill-type">Pipeline</span>
                <span class="skill-version">${pipe.version}</span>
              </div>
              <h3 class="skill-name">${pipe.id}</h3>
              <p class="skill-desc">${pipe.desc}</p>
              <span class="skill-submodule">${pipe.submodule}</span>
            </div>
  `).join('\n');
  
  // Build full HTML page
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${moduleConfig.name} - PM Skill Galaxy</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif; background: #0a0a1a; color: #fff; overflow-x: hidden; }
        #starfield { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; background: rgba(10, 10, 26, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .nav-content { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #00d4ff, #b829dd); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
        .logo-text { font-size: 1.25rem; font-weight: 600; color: white; }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        .nav-links a { color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 0.9rem; transition: color 0.3s; }
        .nav-links a:hover { color: #00d4ff; }
        .hero { position: relative; z-index: 1; padding: 8rem 2rem 4rem; text-align: center; }
        .hero-icon { font-size: 4rem; margin-bottom: 1.5rem; }
        .hero h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: 1.1rem; color: rgba(255, 255, 255, 0.7); max-width: 700px; margin: 0 auto 2rem; line-height: 1.6; }
        .stats-bar { display: flex; justify-content: center; gap: 3rem; margin-top: 2rem; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, ${moduleConfig.color}, #b829dd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-label { font-size: 0.875rem; color: rgba(255, 255, 255, 0.6); margin-top: 0.25rem; }
        .content { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .section { margin-bottom: 4rem; }
        .section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; }
        .section-title .icon { width: 8px; height: 32px; background: linear-gradient(180deg, ${moduleConfig.color}, #b829dd); border-radius: 4px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
        .skill-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 1.5rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
        .skill-card::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent); transition: left 0.7s; }
        .skill-card:hover::before { left: 100%; }
        .skill-card:hover { transform: translateY(-5px); border-color: rgba(255, 255, 255, 0.2); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
        .skill-card.orchestrator { border-left: 3px solid ${moduleConfig.color}; }
        .skill-card.pipeline { border-left: 3px solid rgba(255, 255, 255, 0.3); }
        .skill-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .skill-type { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
        .orchestrator .skill-type { background: rgba(0, 212, 255, 0.15); color: #00d4ff; }
        .pipeline .skill-type { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.7); }
        .skill-version { font-size: 0.8rem; color: rgba(255, 255, 255, 0.4); }
        .skill-name { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; color: #fff; }
        .skill-desc { font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); line-height: 1.5; margin-bottom: 1rem; }
        .skill-submodule { display: inline-block; padding: 0.25rem 0.75rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 0.8rem; color: rgba(255, 255, 255, 0.7); }
        .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: rgba(255, 255, 255, 0.8); text-decoration: none; font-size: 0.9rem; transition: all 0.3s; margin-bottom: 2rem; }
        .back-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); }
        .footer { position: relative; z-index: 1; border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 3rem 2rem; text-align: center; color: rgba(255, 255, 255, 0.5); margin-top: 4rem; }
        @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr; } .stats-bar { flex-wrap: wrap; gap: 1rem; } .nav-links { display: none; } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a1a; }
        ::-webkit-scrollbar-thumb { background: #3a3a8a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #5a5aaa; }
    </style>
</head>
<body>
    <canvas id="starfield"></canvas>
    <nav class="nav">
        <div class="nav-content">
            <a href="../index.html" class="logo">
                <div class="logo-icon">PM</div>
                <span class="logo-text">Skill Galaxy</span>
            </a>
            <div class="nav-links">
                <a href="../index.html#modules">模块</a>
                <a href="../index.html#flow">流程</a>
                <a href="https://github.com/LuckyOneTwoThree/pm-skill" target="_blank">GitHub</a>
            </div>
        </div>
    </nav>
    <section class="hero">
        <div class="hero-icon">${moduleConfig.icon}</div>
        <h1>${moduleConfig.name}</h1>
        <p>${moduleConfig.desc}</p>
        <div class="stats-bar">
            <div class="stat-item"><div class="stat-value">${orchestrators.length}</div><div class="stat-label">编排器</div></div>
            <div class="stat-item"><div class="stat-value">${pipelines.length}</div><div class="stat-label">Pipeline</div></div>
            <div class="stat-item"><div class="stat-value">0</div><div class="stat-label">导航</div></div>
            <div class="stat-item"><div class="stat-value">${totalSkills}</div><div class="stat-label">总计</div></div>
        </div>
    </section>
    <div class="content">
        <a href="../index.html#modules" class="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            返回模块列表
        </a>
        ${orchestratorCards ? `<div class="section"><h2 class="section-title"><span class="icon"></span>编排器 (Orchestrators)</h2><div class="skills-grid">${orchestratorCards}</div></div>` : ''}
        ${pipelineCards ? `<div class="section"><h2 class="section-title"><span class="icon"></span>Pipeline Skills</h2><div class="skills-grid">${pipelineCards}</div></div>` : ''}
    </div>
    <footer class="footer"><p>Made with ❤️ by lucky | 126 个 AI Agent Skills</p></footer>
    <script>
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        let width, height, stars = [], mouseX = 0, mouseY = 0;
        const colors = ['#00d4ff', '#b829dd', '#ff006e', '#00f5ff', '#ffffff'];
        function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; initStars(); }
        function initStars() { stars = []; const count = Math.floor((width * height) / 4000); for (let i = 0; i < count; i++) { stars.push({ x: Math.random() * width, y: Math.random() * height, z: Math.random() * 2, size: Math.random() * 2 + 0.5, opacity: Math.random(), speed: Math.random() * 0.5 + 0.1, color: colors[Math.floor(Math.random() * colors.length)] }); } }
        function animate() { ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'; ctx.fillRect(0, 0, width, height); stars.forEach(star => { const parallaxX = (mouseX - width / 2) * 0.02 * star.z; const parallaxY = (mouseY - height / 2) * 0.02 * star.z; const x = star.x + parallaxX; const y = star.y + parallaxY; star.opacity += (Math.random() - 0.5) * 0.02; star.opacity = Math.max(0.1, Math.min(1, star.opacity)); ctx.beginPath(); ctx.arc(x, y, star.size, 0, Math.PI * 2); ctx.fillStyle = star.color; ctx.globalAlpha = star.opacity; ctx.fill(); ctx.globalAlpha = 1; star.y += star.speed; if (star.y > height) { star.y = 0; star.x = Math.random() * width; } }); requestAnimationFrame(animate); }
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
        resize(); animate();
    </script>
</body>
</html>`;
  
  return html;
}

// Generate all module pages
for (const [key, config] of Object.entries(modules)) {
  const outputPath = path.join(__dirname, '..', 'modules', `${key}.html`);
  const html = generateModulePage(key, config);
  fs.writeFileSync(outputPath, html);
  console.log(`Generated: ${outputPath}`);
}

console.log('All module pages generated successfully!');

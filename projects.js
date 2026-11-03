/* 作品内容集中在此维护；未核实的个人分工、比赛名次和联系信息不做推断。 */
window.PORTFOLIO = {
  downloadBase: './downloads/',
  projects: [
    {
      id: 'dungeon', number: '01', title: '纸上地牢', en: 'PAPER DUNGEON', category: 'roguelike', type: '卡牌肉鸽 / 随机地牢',
      cover: './assets/dungeon-cover.jpg', coverAlt: '纸上地牢手绘风格宣传封面', coverNote: '宣传封面', file: 'paper-dungeon-windows.zip', size: '102.2 MiB',
      tags: ['卡牌连携', '随机探索', '肉鸽'],
      headline: '手牌换位、连携与随机地牢',
      intro: '一款结合卡牌战斗和地牢探索的游戏。战斗中可以换位、连携和合成手牌，探索时在随机房间里收集卡牌、道具和资源。',
      facts: [['玩法', '手牌连携与房间探索'], ['技术', 'Godot / GDScript'], ['版本', 'Windows 试玩版']],
      loop: ['探索随机房间', '战斗与卡牌连携', '收集道具和奖励', '继续构筑与下楼'],
      notes: [
        { title: '手牌换位与连携', text: '相邻手牌可以换位，并按规则触发连携或合成。敌人卡面单独显示当前生命和本回合伤害，出牌前可以查看。' },
        { title: '随机房间的连接检查', text: '地图中有普通战斗房、首领房和特殊房。制作时增加了路径检查，避免前往一间特殊房必须经过另一间特殊房的情况。' },
        { title: '命运的获取与使用', text: '战斗中触发连携或合成时，有机会获得命运。探索时可以消耗命运，重掷当前房间的奖励。' },
        { title: '卡牌与道具的配置', text: '卡牌、敌人、道具、消耗品和房间分别放在内容库中维护。添加内容或调整数值时，可以修改对应资源。' }
      ],
      gallery: [ {src:'./assets/dungeon-battle.png',caption:'开发画面 / 卡牌战斗与手牌布局'}, {src:'./assets/dungeon-room.png',caption:'开发画面 / 房间探索与纸绘场景'} ],
      controls: [['WASD', '探索移动'], ['E', '拾取、开箱与房间互动'], ['R', '消耗命运重掷奖励'], ['I / C', '背包 / 消耗品'], ['鼠标', '选择卡牌、目标并出牌'], ['Esc', '设置或关闭当前弹窗']],
      playNote: '完整解压后运行“纸上地牢.exe”。请保持同名 PCK 文件与 EXE 在同一目录。当前版本不提供局内进度存档。'
    },
    {
      id: 'delay', number: '02', title: 'DELAY', en: '2D PLATFORM PUZZLE', category: 'puzzle', type: '2D 横版 / 时空解谜',
      cover: './assets/delay-village.png', coverAlt: 'DELAY 的像素村庄和空中方块机关', coverNote: '开发画面', file: 'delay-windows.zip', size: '58.9 MiB',
      tags: ['延迟施力', '机关传导', '关卡工具', '解谜'],
      headline: '先储存方向力，再用装置释放',
      intro: '一款以延迟施力为主要玩法的横版解谜游戏。先向方块记录方向，再用范围装置触发移动，配合压力门、绳索和联动方块完成关卡。',
      facts: [['玩法', '储力 → 释力 → 传导'], ['技术', 'Godot / GDScript / JSON'], ['流程', '序章、4 个正式关卡与结局']],
      loop: ['观察机关状态', '记录方向力', '布置范围装置', '统一释放与回撤'],
      notes: [
        { title: '储力与释放', text: '方块按照记录的方向顺序移动，装置范围决定哪些方块会被触发。移动后还要考虑重力，以及与其他方块的联动。' },
        { title: '四个关卡的安排', text: '四个正式关卡是村外、村内、联动机关室和时空夹缝。从基础施力开始，再逐步加入范围释放、压力机关、绳索和联动传导。' },
        { title: '回撤与检查点', text: '检查点会保存玩家、方块、储力队列、装置和绳索的状态。单步操作可以回撤，也可以返回检查点重新尝试。' },
        { title: '关卡编辑器', text: '关卡编辑器支持调整镜头区域、机关连线和方块编组，也可以框选剪贴、撤销、修改参数，再保存为 JSON 关卡数据。' }
      ],
      gallery: [{src:'./assets/delay-village.png',caption:'开发画面 / 村庄与机关布局'},{src:'./assets/delay-mechanism.png',caption:'开发画面 / 时空夹缝关卡'},{src:'./assets/delay-cover.png',caption:'开发画面 / 标题界面'}],
      controls: [],
      playNote: '解压后运行 DELAY.exe。具体按键以游戏内教程和设置页为准；项目包含按键重映射与中英双语设置。'
    },
    {
      id: 'algee', number: '03', title: '阿吉与花海', en: 'ALGEE & BLOOMS', category: 'puzzle', type: 'GameJam / 2D 网格解谜',
      cover: './assets/algee-cover.png', coverAlt: '阿吉与查理在星空花海中的游戏封面', coverNote: '主菜单美术', file: 'algee-and-blooms-windows.zip', size: '42.6 MiB',
      tags: ['Grow 主题', '路径规划', '关卡教学', '解谜'],
      headline: '在有限身长内规划到蓝花的路线',
      intro: '阿吉和守在起点的机器人查理通过管道相连。玩家需要在身长限制内寻找蓝花，途中可以拾取花瓣增加身长，花丛也会随步数扩张并挡住道路。',
      facts: [['项目背景', '2026 YIGUANG Project GameJam'], ['技术', 'Godot / GDScript'], ['内容', '5 个可玩关卡']],
      loop: ['规划管道路径', '拾取花瓣增长', '应对花丛扩张', '抵达蓝花终点'],
      notes: [
        { title: '身长增长与花丛扩张', text: '围绕 GameJam 的 Grow 主题，游戏中有两种生长：花瓣让管道能延伸得更远，花丛扩张则减少可走的格子。绕路拾取花瓣时，也要计算花丛生长的时间。' },
        { title: '管道截断', text: '踏回已经铺过的管道会截断身体，空出一部分身长，之后可以换一条路线继续走。' },
        { title: '五关的教学安排', text: '前几关依次介绍移动、花瓣、静态障碍和周期生长。最后一关加入多个生长机关，需要同时考虑花瓣位置和封路顺序。' },
        { title: '死局判断与重开', text: '界面显示剩余可延伸步数和距下次花丛生长的步数。系统会检查路线是否连通、身长能否到达目标；无解时给出失败提示，也可以快速重开。' }
      ],
      gallery: [{src:'./assets/algee-cover.png',caption:'主菜单美术 / 阿吉与查理'}],
      controls: [],
      playNote: '解压后运行 Algee-and-Blooms.exe。具体操作以游戏内提示为准。此项目为团队 GameJam 作品。'
    }
  ]
};
